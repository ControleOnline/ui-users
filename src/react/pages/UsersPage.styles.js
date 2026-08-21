import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12,
  },
  tableCard: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  deniedCard: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  deniedTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  deniedText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
});
