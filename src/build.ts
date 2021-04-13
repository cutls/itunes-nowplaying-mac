import { execSync } from 'child_process'
if (process.platform === 'darwin') execSync('make')
