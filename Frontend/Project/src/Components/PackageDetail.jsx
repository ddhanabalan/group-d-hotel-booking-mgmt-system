import Showcase from "./Showcase";
import { HotelDetail } from "../Detail/HotelDetail";
import WrapperContainer from "./WrapperContainer";

const PackageDetail = () => {
  return (
    <div className="bg-[#0b8185]">
    <WrapperContainer> 
      <div className="flex flex-col md:flex-row items-center p-4 py-12 text-[#fcf2de]">
        <div className="w-1/2">
          <span>Packages</span>
          <h3 className="text-4xl">Treat Yourself</h3>
        </div>
        <div className="w-1/2">
          <p className="text-[16px]">
            We here at Atliq offer a wide variety of hotels are affordable prices and amazing services so that our customers can have a wonderful time!
          </p>
        </div>
      </div>
      <div
        id="showcase-Section"
        className="container m-auto flex flex-wrap flex-col md:flex-row justify-between items-center"
      >
        {HotelDetail.map((detail) => (
          <Showcase
            img={detail.image}
            title={detail.title}
            desc={detail.desc}
            button={detail.button}
          />
        ))}
      </div>
      </WrapperContainer> 
    </div>
  );
};

export default PackageDetail;
