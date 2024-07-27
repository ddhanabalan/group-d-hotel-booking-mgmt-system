import image from '../assets/christian-lambert-vmIWr0NnpCQ-unsplash.jpg'

export function HeroSection() {
  return (
    <div className="relative w-full pb-8">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
          <h1 className="mt-8 text-3xl font-bold tracking-tight md:text-4xl lg:text-6xl">
            Discover amazing Hotels and Enjoy a <span className='text-[#0B8185] capitalize'>memorable stay in ATLIQ</span>
          </h1>
          <p className="mt-8 text-lg">
          Explore a curated selection of top hotels with unparalleled amenities and seamless booking experiences. Find the perfect stay that suits your needs and enjoy exceptional service every step of the way.
          </p>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6">
          <img
            className="aspect-[3/2] bg-gray-50 rounded object-cover lg:aspect-[4/3] lg:h-[700px] xl:aspect-[16/9]"
            src={image}
            alt=""
          />
        </div>
      </div>
    </div>
  )
}
