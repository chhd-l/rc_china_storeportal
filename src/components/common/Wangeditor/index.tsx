import { useState, useEffect, FC } from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { IEditorConfig, DomEditor } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
interface EditorProps {
  onChange?: Function
  defaultValue?: string
}
type InsertFnType = (url: string) => void
const MyEditor: FC<EditorProps> = ({ defaultValue = '', onChange }) => {
  const [editor, setEditor] = useState<any>(null) // 存储 editor 实例
  const [html, setHtml] = useState('')

  const toolbarConfig = {
    excludeKeys: [
      'headerSelect',
      'italic',
      'group-justify',
      'group-indent',
      'bulletedList',
      'numberedList',
      'group-video',
      'group-more-style', // 排除菜单组，写菜单组 key 的值即可
    ],
  }
  const editorConfig: Partial<IEditorConfig> = { MENU_CONF: {} } // 初始化 MENU_CONF 属性
  // 修改 uploadImage 菜单配置
  if (editorConfig.MENU_CONF) {
    //上面就申明了，但是一直提示object可能为空？？
    editorConfig.MENU_CONF['uploadImage'] = {
      server: 'https://dtc-faas-dtc-plaform-dev-woyuxzgfcv.cn-shanghai.fcapp.run/upload',
      fieldName: 'file',
      // meta: {
      //   type: 'image',
      // },
      // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
      allowedFileTypes: ['image/*'],
      headers: {
        authorization: 'authorization-text',
      },
      // 自定义插入图片
      customInsert (res: any, insertFn: InsertFnType) {
        // res 即服务端的返回结果
        let { url } = res
        console.info(url)
        // 从 res 中找到 url alt href ，然后插图图片
        insertFn(url)
      },
      maxFileSize: 10 * 1024 * 1024, // 10M
      // 继续写其他配置...
      //【注意】不需要修改的不用写，wangEditor 会去 merge 当前其他配置
    }
  }
  useEffect(() => {
    if (defaultValue) {
      console.info('goodsDescriptiondefaultValue======', defaultValue)
      setHtml(`<p>${defaultValue}</p>`) //不知道为啥加了标签就可以反显，不加就不行
    }
  }, [defaultValue])

  // 及时销毁 editor
  useEffect(() => {
    if (editor) {
      const toolbar = DomEditor.getToolbar(editor)
      const uploadImageConfig = editor.getMenuConfig('uploadImage')
      console.info('toolbar', toolbar)
      console.info('uploadImageConfig', uploadImageConfig)
    }
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])
  // console.info('htmlhtmlhtml', html)
  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100, marginTop: '15px' }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode='default'
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={editor => {
            let htmls = editor.getHtml()
            // console.info('htmlshtmlshtmlshtmlshtmls', htmls)
            setHtml(htmls)
            onChange?.(htmls)
          }}
          mode='default'
          style={{ height: '400px' }}
        />
      </div>
    </>
  )
}

export default MyEditor
