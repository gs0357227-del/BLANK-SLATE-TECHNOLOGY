import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const IdeaCard = ({ idea, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={2}>{idea.title}</Text>
        <View style={styles.score}>
          <Text style={styles.scoreText}>{idea.aiScore?.overallScore || 0}</Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>{idea.description}</Text>

      <View style={styles.footer}>
        <View style={styles.badges}>
          <View style={[styles.badge, { backgroundColor: '#e0e7ff' }]}>
            <Text style={styles.badgeText}>{idea.category}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#f0fdf4' }]}>
            <Text style={styles.badgeText}>{idea.difficulty}</Text>
          </View>
        </View>

        <View style={styles.stats}>
          <Text style={styles.statText}>👍 {idea.stats?.upvotes || 0}</Text>
          <Text style={styles.statText}>👀 {idea.stats?.views || 0}</Text>
          <Text style={styles.statText}>⭐ {idea.stats?.saves || 0}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
    marginRight: 8,
  },
  score: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  scoreText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 18,
    marginBottom: 10,
  },
  footer: {
    marginTop: 8,
  },
  badges: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#374151',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statText: {
    fontSize: 12,
    color: '#6b7280',
  },
});

export default IdeaCard;
