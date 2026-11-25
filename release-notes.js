/* Release notes for the Wall Display, newest first.
   Every change that the user can see gets an entry here, in the same commit as the change.
   A change that the user cannot see needs no entry, because the "App updated" box covers it.

   Each entry:
     id     Unique, and never changed after release, because devices remember the newest id they
            showed. Use the date. For a second release on the same day, add -b, then -c.
     date   The release day, as YYYY-MM-DD.
     title  A short name for the release.
     items  { kind: 'added' | 'changed' | 'removed', text } — say in plain words what the user
            can do now, and where in the app. */
var RELEASE_NOTES = [
  {
    id: '2026-11-25-b',
    date: '2026-11-25',
    title: 'Easier to read, calmer wind',
    items: [
      { kind: 'changed', text: 'The clock and the temperature are larger and bold, so you can read them from across the room.' },
      { kind: 'changed', text: 'The wind streamers now match the wind. In light air they lift one at a time and settle down again. The stronger the wind, the longer they stay up. From about 25 mph they stay up.' }
    ]
  },
  {
    id: '2026-11-25',
    date: '2026-11-25',
    title: 'Updates when you want them',
    items: [
      { kind: 'added', text: 'When a new version is ready, a bar at the bottom of the screen tells you. Tap Update when it suits you. The page never reloads by itself.' },
      { kind: 'added', text: 'After an update, a "What’s new" box at the bottom shows once what changed.' }
    ]
  }
];

if (typeof module !== 'undefined') module.exports = { RELEASE_NOTES };
