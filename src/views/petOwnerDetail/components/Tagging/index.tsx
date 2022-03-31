import { CloseOutlined } from "@ant-design/icons";
import { Tag } from "@/framework/types/customer";

interface TagInfoProps {
    tagList: Tag[];
    id: string;
}

const Tagging = ({ tagList, id }: TagInfoProps) => {
  const deleteTag = () => {};
  return (
    <div id={id}>
      <div className="py-4 px-2 border-b text-xl font-medium">Tagging</div>
      <div className="px-2 py-4 flex flex-col">
        <div>Tag name</div>
        <div className="border flex flex-row flex-wrap p-2 mt-2">
          {tagList.map((item: Tag) => (
            <div className="bg-gray1 p-1 font-normal flex items-center">
              <div className="mr-2">{item.name}</div>{" "}
              <CloseOutlined onClick={() => deleteTag()} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Tagging;
