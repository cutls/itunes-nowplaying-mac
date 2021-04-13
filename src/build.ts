import { execSync } from 'child_process'
process.on('uncaughtException', function (err) {
    console.warn(
        'build native failed: skipped. cannot use itunes-nowplaying-mac'
    )
})
if (process.platform === 'darwin') execSync('make')
