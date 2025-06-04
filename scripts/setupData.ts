import fs from 'fs-extra';
import path from 'path';

const dataDir = path.join(process.cwd(), 'F1');
const cleanedDataDir = path.join(dataDir, 'F1_cleaned');

async function setupDataDirectories() {
  try {
    // Create main data directory
    await fs.ensureDir(dataDir);
    console.log('Created F1 data directory');

    // Create cleaned data directory
    await fs.ensureDir(cleanedDataDir);
    console.log('Created F1 cleaned data directory');

    // Create placeholder files
    const files = ['drivers.csv', 'constructors.csv', 'races.csv', 'results.csv'];
    for (const file of files) {
      const filePath = path.join(cleanedDataDir, file);
      if (!await fs.pathExists(filePath)) {
        await fs.writeFile(filePath, '');
        console.log(`Created placeholder file: ${file}`);
      }
    }

    console.log('Data directory setup complete!');
  } catch (error) {
    console.error('Error setting up data directories:', error);
    process.exit(1);
  }
}

setupDataDirectories(); 