import styles from "../stress/stress.module.css"
import PageSpecific from "@/components/PageSpecific/page"

export default function Stress() {
    return(
        <PageSpecific 
        url={`${process.env.NEXT_PUBLIC_API_URL}/remedios/categoria/1`}
        />
    )
}