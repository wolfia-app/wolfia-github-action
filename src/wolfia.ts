import * as core from '@actions/core'
import * as fs from 'fs'
import FormData from 'form-data'
import axios, {AxiosResponse} from 'axios'
import path from 'path'

export async function generateMagicLink(
  linkDescription: string,
  binaryPath: string,
  additionalInfo: string,
): Promise<AxiosResponse<MagicLink>> {
  const apiKeyId = core.getInput('wolfia-api-key-id')
  const apiKeySecret = core.getInput('wolfia-api-key-secret')

  const formData = new FormData()
  formData.append(
    'binary',
    fs.readFileSync(binaryPath),
    path.parse(binaryPath).base
  )
  formData.append('linkdescription', linkDescription)
  formData.append('linkadditionalinfo', additionalInfo)

  return axios.post<MagicLink>('https://wolfia.com/magic-links', formData, {
    headers: {
      'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
      'X-Api-Key-Id': apiKeyId,
      'X-Api-Key-Secret': apiKeySecret
    }
  })
}

export interface MagicLink {
  link: string
  linkCreatedBy: string
  linkTitle: string
  linkDescription: string
}
