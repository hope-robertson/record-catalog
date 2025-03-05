// imports/import_collective.ts

import knex from 'knex'
import xlsx from 'xlsx'
import {
  processCollectiveRecord,
  CollectiveFormattedRecord,
  CollectiveRawRecord,
} from '../lib/data-processing'
import knexConfig from '../knexfile'

const db = knex(knexConfig.development)

async function importData(filePath: string): Promise<void> {
  try {
    const workbook = xlsx.readFile(filePath)
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const records: CollectiveRawRecord[] = xlsx.utils.sheet_to_json(worksheet)
    const formattedRecords: CollectiveFormattedRecord[] = records.map(
      processCollectiveRecord
    )

    await db('collective_instock').insert(formattedRecords)
    console.log('Collective data imported successfully.')
  } catch (error) {
    console.error('Error importing Collective data:', error)
  }
}

// Example usage:
// importData('collective_data.xlsx')
