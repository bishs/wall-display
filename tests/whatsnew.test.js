// Run: node --test tests/whatsnew.test.js
const test = require('node:test');
const assert = require('node:assert/strict');
const { quietUpdate, unseenReleases } = require('../whatsnew.js');

const note = (id, date) => ({ id, date: date || id.slice(0, 10), title: id, items: [] });
const NOTES = [
  note('2026-11-20-b', '2026-11-20'),
  note('2026-11-20'),
  note('2026-11-10'),
  note('2026-11-01'),
  note('2026-10-15'),
];
const ids = list => list.map(n => n.id);

test('known last-seen id: shows every entry newer than it', () => {
  assert.deepEqual(ids(unseenReleases(NOTES, '2026-11-10', null)), ['2026-11-20-b', '2026-11-20']);
});

test('known last-seen id that is the newest: shows nothing', () => {
  assert.deepEqual(unseenReleases(NOTES, '2026-11-20-b', null), []);
});

test('id no longer in the list, with a sign-up date: shows entries after sign-up', () => {
  assert.deepEqual(ids(unseenReleases(NOTES, 'gone', '2026-11-05T09:30:00Z')), ['2026-11-20-b', '2026-11-20', '2026-11-10']);
});

test('entry on the sign-up day itself is not shown', () => {
  assert.deepEqual(ids(unseenReleases(NOTES, null, '2026-11-20')), []);
});

test('no id and no sign-up date: shows nothing', () => {
  assert.deepEqual(unseenReleases(NOTES, null, null), []);
  assert.deepEqual(unseenReleases(NOTES, 'gone', null), []);
});

test('more than 3 unseen releases: shows only the newest 3', () => {
  assert.deepEqual(ids(unseenReleases(NOTES, '2026-10-15', null)), ['2026-11-20-b', '2026-11-20', '2026-11-10']);
});

test('quiet update: build id changed and no notes', () => {
  assert.equal(quietUpdate('20261120-100000', '20261125-100000', false), true);
});

test('no quiet update when notes exist', () => {
  assert.equal(quietUpdate('20261120-100000', '20261125-100000', true), false);
});

test('no quiet update when the build id is the same', () => {
  assert.equal(quietUpdate('20261125-100000', '20261125-100000', false), false);
});

test('first start with no saved build id: no quiet update', () => {
  assert.equal(quietUpdate(null, '20261125-100000', false), false);
});
