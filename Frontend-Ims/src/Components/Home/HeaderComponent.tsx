
import {motion} from "framer-motion"

const HeaderComponent = ()=>{
   return (
      <div>
         <div className=" bg-gradient-to-r from-navy to-teal flex flex-initial    text-6xl mt-20 text-center  h-screen font-bold opacity font-sans cursor-pointer text-blue-900">
            <motion.div whileHover={{scale:1.1}}>
            <div className="ml-30 text-left">
<p className="leading-tight">
   <span className="block">Your Global Commerce</span>
   <span className="block">Partner,Engineered</span>
   <span className="block"> for Peak</span>
   <span className="block">Performance</span>
</p>
</div>
            </motion.div>
      </div>
            
      </div>
   )
}


export default HeaderComponent