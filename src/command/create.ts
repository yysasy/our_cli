import path from 'path'
import fs from 'fs-extra'
import { input ,select} from '@inquirer/prompts'
import { clone } from '../utils/clone'
import { version,name} from '../../package.json'
import { checkVersion } from '../utils/version'
export interface TemplateInfo {
    name: string; // 模板名称  
    downloadUrl: string; // 模板下载地址
    description: string; // 模板描述
    branch: string; // 模板分支
}
export const tempaltes: Map<string,TemplateInfo> = new Map(
    [
        [
            "Vite-Vue3-TypeScript-template",{
                name:'Vite-Vue3-TypeScript-template',
                downloadUrl:'https://github.com/un-pany/v3-admin-vite',
                description:'Vue3技术栈开发模板',
                branch:'main',
            }
        ],
        [
            "Vite-Vue3-TypeScript-template2",{
                name:'Vite-Vue3-TypeScript-template2',
                downloadUrl:'https://gitee.com/sohucw/admin-pro',
                description:'Vue3技术栈开发模板',
                branch:'dev10',
            }
        ]
    ]
)
export function isOverwrite(fileName:string){
  console.warn(`项目${fileName}已存在`)
  return select({
    message:'是否覆盖',
    choices:[
      {
        name:'覆盖',
        value:true
      },
      {
        name:'取消',
        value:false
      }
    ]
  })
}

export async function create(projectName?: string) {
  const templateList = Array.from(tempaltes).map((item:[string,TemplateInfo])=>{
    const [name,info] = item
    return {
        name,
        value:name,
        description:info.description
    }
  })
  if(!projectName){
    projectName = await input({message:'请输入项目名称'})
  }
  
  const filePath = path.resolve(process.cwd(),projectName)
  if(fs.existsSync(filePath)){
    const run = await isOverwrite(filePath)
    if(run) {
      await fs.remove(filePath)
    } else {
      return
    }
  }
  // 检测版本更新
  await checkVersion(name,version)
  const templateName = await select({message:'请选择模板',choices:templateList})
  const info = tempaltes.get(templateName)
  console.log(info);
  if(info){
    clone(info.downloadUrl,projectName,['-b',info.branch])
  }
  
}