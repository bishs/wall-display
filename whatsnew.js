/* The rules that choose what the "What's new" box shows.
   These functions are pure: they read no storage, so tests can run them on their own
   (tests/whatsnew.test.js). A plain script, not a module, because modules do not load
   when the tablet opens the page from a file. */
var MOST_SHOWN = 3;

/* True when the app was updated and has no new release note. Never true on the first start
   with this feature, because no build id is saved yet. */
function quietUpdate(lastBuild, currentBuild, hasNotes) {
  return !hasNotes && lastBuild !== null && lastBuild !== currentBuild;
}

/* The release notes that this user has not seen yet, newest first.
   With a known last-seen id: every entry newer than it.
   With no known id: the entries dated after the sign-up date (none when there is no date). */
function unseenReleases(notes, lastSeenId, joinedAt) {
  var seenAt = lastSeenId ? notes.findIndex(function (n) { return n.id === lastSeenId; }) : -1;
  var fresh = seenAt >= 0 ? notes.slice(0, seenAt)
    : joinedAt ? notes.filter(function (n) { return n.date > joinedAt.slice(0, 10); })
    : [];
  return fresh.slice(0, MOST_SHOWN);
}

if (typeof module !== 'undefined') module.exports = { MOST_SHOWN, quietUpdate, unseenReleases };
