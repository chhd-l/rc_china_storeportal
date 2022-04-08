import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Pet } from "@/framework/types/customer";

interface PetInfoProps {
    petList: Pet[];
    id: string;
}

const PetInformation = ({ petList,id }: PetInfoProps) => {
  const navigator = useNavigate();

  return (
    <div id={id}>
      <div className="py-4 px-2 border-b text-xl font-medium">
        Pet Information
      </div>
      <div className="px-2 py-4 flex flex-row flex-wrap">
        {petList.map((item: Pet) => (
          <div className="flex items-center border p-4 mr-4" key={item.id}>
            <Avatar shape="square" size="large" icon={<UserOutlined />} />
            <div className="ml-4">
              <div>{item.name}</div>
              <div className="flex flex-row">
                <div className="flex flex-col mr-4">
                  <span className="text-gray-400">Age</span>
                  <span>{item.age} months</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400">Breed</span>
                  <span>{item.breed}</span>
                </div>
              </div>
            </div>
            <Button
              type="primary"
              danger
              className="ml-8 self-end"
              onClick={() => {
                navigator("/pet-detail", { state: { id: item.id } });
              }}
            >
              Details
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PetInformation;
