import { version,name} from '../../package.json'
import axios,{ AxiosResponse } from 'axios'
import { gt } from 'lodash'
import chalk from 'chalk'

export const getNpmInfo = async (name:string)=>{
    const npmUrl = `https://registry.npmjs.org/${name}`
    let res = {}
    try {
        res = await axios.get(npmUrl)
    } catch (error) {
      console.error(error);
      
    }
    return res
  }
  export const getNpmLastesVersion = async (name:string)=>{
    const {data} =  await (getNpmInfo(name)) as AxiosResponse
    return data['dist-tags'].latest
  }
  export const checkVersion = async (name:string,version:string)=>{
      const lastestVersion = await getNpmLastesVersion(name)
      const need = gt(lastestVersion,version)
      if(need){
        console.warn(`发现新版本${lastestVersion}，当前版本是：${version}`)
        console.log(`可使用：${chalk.yellow(`npm install -g ${name}`)} 进行更新}`)
      }
      return need
  }