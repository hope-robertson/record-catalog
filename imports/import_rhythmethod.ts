// imports/import_rhythmethod.ts

import knex from 'knex'
import xlsx from 'xlsx'
import {
  processRhythmethodRecord,
  RhythmethodFormattedRecord,
  RhythmethodRawRecord,
} from '../lib/data-processing'
import knexConfig from '../knexfile'

const db = knex(knexConfig.development)

async function importData(filePath: string): Promise<void> {
  try {
    const workbook = xlsx.readFile(filePath)
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const records: RhythmethodRawRecord[] = xlsx.utils.sheet_to_json(worksheet)
    const formattedRecords: RhythmethodFormattedRecord[] = records.map(
      processRhythmethodRecord
    )

    await db('rhythmethod_instock').insert(formattedRecords)
    console.log('Rhythmethod data imported successfully.')
  } catch (error) {
    console.error('Error importing Rhythmethod data:', error)
  }
}

// Example usage:
// importData('rhythmethod_data.xlsx');
