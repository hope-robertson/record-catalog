import knex from 'knex'
import xlsx from 'xlsx'
import {
  processJunoRecord,
  JunoFormattedRecord,
  JunoRawRecord,
} from '../lib/data-processing'
import knexConfig from '../knexfile'

const db = knex(knexConfig.development)

async function importData(filePath: string): Promise<void> {
  try {
    const workbook = xlsx.readFile(filePath)
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const records: JunoRawRecord[] = xlsx.utils.sheet_to_json(worksheet)
    const formattedRecords: JunoFormattedRecord[] =
      records.map(processJunoRecord)

    await db('juno_instock').insert(formattedRecords)
    console.log('Juno data imported successfully.')
  } catch (error) {
    console.error('Error importing Juno data:', error)
  }
}

// Example usage:
importData('juno_data.xlsx')
