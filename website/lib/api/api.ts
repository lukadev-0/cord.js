import glob from 'glob'
import { promisify } from 'util'
import { join } from 'path'
import { ApiModel } from '@microsoft/api-extractor-model'

const apiDir = join(process.cwd(), 'api')
const globAsync = promisify(glob)

export async function getApiModel() {
  const paths = await globAsync('*.api.json', { cwd: apiDir })
  const apiModel = new ApiModel()

  for (const path of paths) {
    const apiFile = join(apiDir, path)
    apiModel.loadPackage(apiFile)
  }

  return apiModel
}
