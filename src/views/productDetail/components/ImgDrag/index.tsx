import { FC } from 'react'
import { ImgSortContainer } from '../../modules/constant'
import { SortableElement, SortableHandle } from 'react-sortable-hoc'
import Upload from '../UploadList'
import { arrayMoveImmutable } from 'array-move'

interface Props {
  initAsserts: any
  setInitAsserts: Function
  form: any
}

const ImgDrag: FC<Props> = ({ initAsserts, setInitAsserts, form }) => {
  const DragHandle = SortableHandle(({ img, imgIdx }: { img: any; imgIdx: number }) => {
    return (
      <Upload
        key={img?.key || `img-${imgIdx}`}
        handleImgUrl={handleImgUrl}
        idx={imgIdx}
        type='image'
        fileName={`Image${imgIdx + 1}`}
        fileList={[img]}
        showUploadList={false}
      />
    )
  })
  const SortElements = SortableElement(({ img, imgIdx }: { img: any; imgIdx: number }) => {
    // return (
    //   <Upload
    //     key={img?.key || `img-${imgIdx}`}
    //     handleImgUrl={handleImgUrl}
    //     idx={imgIdx}
    //     type='image'
    //     fileName={`image${imgIdx}`}
    //     fileList={[img]}
    //     showUploadList={false}
    //   />
    // )
    return <DragHandle img={img} imgIdx={imgIdx} />
  })
  const handleImgUrl = ({ url, idx, type, id }: any) => {
    let newAssets = [...initAsserts]
    newAssets[idx] = { url, type, id }
    setInitAsserts(newAssets)
    form.setFieldsValue({
      productAsserts: newAssets,
    })
    // console.info('setAssetsUrl', newAssets)
  }
  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    console.info(oldIndex, newIndex,'.....')
    let newAsserts = arrayMoveImmutable(initAsserts, oldIndex, newIndex)
    setInitAsserts(newAsserts)
    form.setFieldsValue({
      productAsserts: newAsserts,
    })
  }
  return (
    <>
      <ImgSortContainer
        axis='xy'
        distance={1}
        useDragHandle={true}
        // key={variationIdx}
        onSortEnd={onSortEnd}
      >
        {initAsserts?.map((img: any, index: number) => (
          <div>
            <SortElements index={index} img={img} imgIdx={index} />
            {/* <div className='mb-4 -mt-1 text-center' style={{ width: 95, color: 'rgb(196, 196, 196)' }}>
              Image{index + 1}
            </div> */}
          </div>
        ))}
      </ImgSortContainer>
    </>
  )
}
export default ImgDrag
