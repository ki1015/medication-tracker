import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@medication_taken_dates';
const LABEL_KEY = '@motivation_label';

// 日付を YYYY-MM-DD に正規化（タイムゾーンはローカル）
function dateKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// 今日の 0:00
function todayStart() {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t;
}

// 初期データは空（0日）
function getInitialTakenDates() {
  return {};
}

// ストリーク計算：今日から遡って連続で飲んだ日数
function calculateStreak(takenDates) {
  const today = dateKey(todayStart());
  if (!takenDates[today]) return 0;
  let count = 0;
  let d = new Date(todayStart());
  while (takenDates[dateKey(d)]) {
    count++;
    d.setDate(d.getDate() - 1);
  }
  return count;
}

// 月のカレンダー用：その月の1日と、表示に必要な前後の空白を含む日付リスト
function getCalendarDays(year, month) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startDay = first.getDay(); // 0=日, 1=月, ...
  const daysInMonth = last.getDate();

  const days = [];
  // 前月の空白
  for (let i = 0; i < startDay; i++) {
    days.push({ date: null, label: '' });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({
      date: new Date(year, month, d),
      label: String(d),
    });
  }
  return days;
}

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];
const ACCENT = '#06b6d4';
const BG_DARK = '#0f172a';
const BG_CARD = '#1e293b';
const TEXT = '#f8fafc';
const TEXT_MUTED = '#94a3b8';
const TAKEN_BG = '#06b6d4';
const TAKEN_FG = '#0f172a';
const NOT_TAKEN_BG = 'transparent';
const NOT_TAKEN_BORDER = '#334155';

export default function App() {
  const [takenDates, setTakenDates] = useState(getInitialTakenDates);
  const [currentMonth, setCurrentMonth] = useState(() => new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());
  const [loaded, setLoaded] = useState(false);
  const [motivationLabel, setMotivationLabel] = useState('孫と遊べる時間 13年と4ヶ月');

  const streak = calculateStreak(takenDates);
  const todayKey = dateKey(todayStart());
  const todayTaken = !!takenDates[todayKey];
  const todayDisplay = (() => {
    const d = todayStart();
    return `${d.getMonth() + 1}月${d.getDate()}日`;
  })();

  // 永続化：読み込み
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          setTakenDates(parsed);
        }
        const label = await AsyncStorage.getItem(LABEL_KEY);
        if (label !== null) setMotivationLabel(label);
      } catch (e) {
        // 初回 or エラー時は初期データのまま
      }
      setLoaded(true);
    })();
  }, []);

  // 永続化：保存
  const persistTaken = useCallback(async (next) => {
    setTakenDates(next);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {}
  }, []);

  const toggleDay = useCallback(
    (date) => {
      if (!date) return;
      if (date > todayStart()) return;
      const key = dateKey(date);
      const next = { ...takenDates };
      if (next[key]) {
        delete next[key];
      } else {
        next[key] = true;
      }
      persistTaken(next);
    },
    [takenDates, persistTaken]
  );

  const CAL_START = { year: 2026, month: 0 };  // 2026年1月
  const CAL_END   = { year: 2028, month: 11 }; // 2028年12月

  const prevMonth = useCallback(() => {
    if (currentYear === CAL_START.year && currentMonth === CAL_START.month) return;
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  }, [currentMonth, currentYear]);

  const nextMonth = useCallback(() => {
    if (currentYear === CAL_END.year && currentMonth === CAL_END.month) return;
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  }, [currentMonth, currentYear]);

  const showAppAlert = useCallback((title, message) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n${message}`);
    } else {
      Alert.alert(title, message, [{ text: 'OK' }]);
    }
  }, []);

  const showAlert1 = useCallback(() => {
    showAppAlert('リマインダー', '飲み忘れてますよ。\n今日分の服薬を記録しましょう。');
  }, [showAppAlert]);

  const showAlert2 = useCallback(() => {
    showAppAlert('お知らせ', 'セットされた薬が残り１錠です');
  }, [showAppAlert]);

  const calendarDays = getCalendarDays(currentYear, currentMonth);

  if (!loaded) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.loadingText}>読み込み中...</Text>
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 上段：ストリーク */}
        <View style={styles.streakSection}>
          <Text style={styles.streakLabel}>連続服用日数</Text>
          <View style={styles.streakRow}>
            <Text style={styles.streakNumber}>{streak}</Text>
            <Text style={styles.streakUnit}>日</Text>
          </View>
          <View style={styles.meterBar}>
            <View
              style={[
                styles.meterFill,
                { width: `${Math.min(100, (streak / 120) * 100)}%` },
              ]}
            />
          </View>
          <TextInput
            style={styles.grandchildTime}
            value={motivationLabel}
            onChangeText={(text) => {
              setMotivationLabel(text);
              AsyncStorage.setItem(LABEL_KEY, text).catch(() => {});
            }}
            placeholder="ここに目標を入力…"
            placeholderTextColor={TEXT_MUTED}
          />
        </View>

        {/* 未服用バナー */}
        {!todayTaken && (
          <View style={styles.reminderBanner}>
            <Text style={styles.reminderText}>
              本日{todayDisplay}はまだ薬を飲んでいません
            </Text>
          </View>
        )}

        {/* 中央：カレンダー */}
        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={prevMonth} style={styles.navBtn}>
              <Text style={styles.navBtnText}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.monthTitle}>
              {currentYear}年 {currentMonth + 1}月
            </Text>
            <TouchableOpacity onPress={nextMonth} style={styles.navBtn}>
              <Text style={styles.navBtnText}>›</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.weekdayRow}>
            {WEEKDAYS.map((w) => (
              <View key={w} style={styles.weekdaySlot}>
                <Text style={styles.weekday}>{w}</Text>
              </View>
            ))}
          </View>
          <View style={styles.daysGrid}>
            {calendarDays.map((cell, index) => {
              if (!cell.date) {
                return <View key={`empty-${index}`} style={styles.daySlot} />;
              }
              const key = dateKey(cell.date);
              const isTaken = !!takenDates[key];
              const isToday =
                key === dateKey(todayStart());
              return (
                <View key={key} style={styles.daySlot}>
                  <TouchableOpacity
                    style={[
                      styles.cell,
                      styles.cellTouchable,
                      isTaken && styles.cellTaken,
                      !isTaken && styles.cellNotTaken,
                      isToday && styles.cellToday,
                    ]}
                    onPress={() => toggleDay(cell.date)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.cellDayText,
                        isTaken && styles.cellDayTextTaken,
                        isToday && !isTaken && styles.cellDayTextToday,
                      ]}
                    >
                      {cell.label}
                    </Text>
                    {isTaken && <Text style={styles.cellCheck}>✓</Text>}
                    {!isTaken && <Text style={styles.cellDash}>－</Text>}
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>

        {/* 下段：今月の服用日数 + アラートボタン */}
        <View style={styles.bottomSection}>
          <Text style={styles.bottomLabel}>
            今月の服用日数:{' '}
            {
              Object.keys(takenDates).filter((k) => {
                const [y, m] = k.split('-').map(Number);
                return y === currentYear && m === currentMonth + 1;
              }).length
            }{' '}
            日
          </Text>
          <View style={styles.alertRow}>
            <TouchableOpacity style={styles.alertBtn1} onPress={showAlert1} activeOpacity={0.8}>
              <Text style={styles.alertBtnText}>アラート1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.alertBtn2} onPress={showAlert2} activeOpacity={0.8}>
              <Text style={styles.alertBtnText}>アラート2</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_DARK,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: TEXT_MUTED,
    fontSize: 16,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 56,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  streakSection: {
    backgroundColor: BG_CARD,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  streakLabel: {
    color: TEXT_MUTED,
    fontSize: 14,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  streakNumber: {
    color: ACCENT,
    fontSize: 48,
    fontWeight: '700',
  },
  streakUnit: {
    color: TEXT,
    fontSize: 20,
    marginLeft: 4,
    fontWeight: '600',
  },
  meterBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#334155',
    borderRadius: 3,
    marginTop: 12,
    overflow: 'hidden',
  },
  meterFill: {
    height: '100%',
    backgroundColor: ACCENT,
    borderRadius: 3,
  },
  grandchildTime: {
    marginTop: 12,
    color: TEXT_MUTED,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    minWidth: 200,
  },
  calendarCard: {
    backgroundColor: BG_CARD,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  navBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBtnText: {
    color: TEXT,
    fontSize: 24,
    fontWeight: '600',
  },
  monthTitle: {
    color: TEXT,
    fontSize: 18,
    fontWeight: '600',
  },
  weekdayRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  weekdaySlot: {
    width: '14.285714%',
    alignItems: 'center',
    paddingVertical: 4,
  },
  weekday: {
    textAlign: 'center',
    color: TEXT_MUTED,
    fontSize: 12,
    fontWeight: '600',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  daySlot: {
    width: '14.285714%',
    aspectRatio: 1,
    padding: 3,
  },
  cell: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellTouchable: {},
  cellTaken: {
    backgroundColor: TAKEN_BG,
  },
  cellNotTaken: {
    backgroundColor: NOT_TAKEN_BG,
    borderWidth: 1,
    borderColor: NOT_TAKEN_BORDER,
  },
  cellToday: {
    borderWidth: 2,
    borderColor: ACCENT,
  },
  cellDayText: {
    color: TEXT_MUTED,
    fontSize: 14,
    fontWeight: '600',
  },
  cellDayTextTaken: {
    color: TAKEN_FG,
  },
  cellDayTextToday: {
    color: ACCENT,
  },
  cellCheck: {
    position: 'absolute',
    bottom: 2,
    fontSize: 10,
    color: TAKEN_FG,
    fontWeight: '700',
  },
  cellDash: {
    position: 'absolute',
    bottom: 2,
    fontSize: 10,
    color: TEXT_MUTED,
  },
  bottomSection: {
    alignItems: 'center',
  },
  bottomLabel: {
    color: TEXT_MUTED,
    fontSize: 14,
    marginBottom: 16,
  },
  alertRow: {
    flexDirection: 'row',
    gap: 12,
  },
  alertBtn1: {
    backgroundColor: '#dc2626',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  alertBtn2: {
    backgroundColor: '#ea580c',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  alertBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  hint: {
    color: TEXT_MUTED,
    fontSize: 11,
    marginTop: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  reminderBanner: {
    backgroundColor: '#dc2626',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  reminderText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
});
