import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PrivateRouter = ({
  children,
}: {
  children: any;
}) => {
  const [status, setStatus] = useState(false)
  const router = useRouter();

  useEffect(()=>{
    if (typeof window !== 'undefined') {
      setStatus(true)
    }
  },[])

  if(status){
    const user = JSON.parse(localStorage.getItem("user") || '{}')
    if(user && user?.user?.role == 192674){
        return children;
    }
    router.push("/admin/login");
    return;
        // dataComment && dataComment.filter((comment: any)=>{
    //   if(comment.status == 0){
    //     setCountCommentClose(countCommentClose+1)
    //   } 
    // })
  }
    
    
};

export default PrivateRouter;
