
const Header = () => {
  const handleClick = () =>{
    window.location.href = '/'
  }
  return (
    <div className="bg-gray-100 p-1 w-full">
       <div className="flex flex-row gap-2 mx-8 md:mx-24 items-center">
            <div className="w-9 h-9">
                    <img src="https://bs-uploads.toptal.io/blackfish-uploads/skill_page/content/logo_file/logo/6212/GraphQL_Logo.svg-490ae3deb7c0f056c849d7463fb8ab39.png" 
                        alt="graphql-logo"
                    />
            </div>
                <button onClick={handleClick} className="text-pink-500 text-2xl cursor-pointer hover:text-black">ProjectMgmt</button>
       </div>
    </div>
  )
}

export default Header