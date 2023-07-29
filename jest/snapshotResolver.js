const path = require('path')

const rootDir = path.resolve(__dirname, '..')
const srcDir = path.join(rootDir, 'src')
const snapshotDir = path.join(rootDir, 'jest', '__snapshots__')

/** Resolves from test to snapshot path */
const resolveSnapshotPath = (testPath, snapshotExtension) => {
  return testPath.replace(srcDir, snapshotDir) + snapshotExtension
}

/** Resolves from snapshot to test path */
const resolveTestPath = (snapshotFilePath, snapshotExtension) => {
  return snapshotFilePath.replace(snapshotDir, srcDir).replace(snapshotExtension, '')
}

/** Example test path, used for preflight consistency check */
const testPathForConsistencyCheck = path.join(srcDir, 'fileName.test.ts')

module.exports = {
  resolveSnapshotPath,
  resolveTestPath,
  testPathForConsistencyCheck,
}
