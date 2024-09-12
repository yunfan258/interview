import styles from './index.module.scss'
// import { Button } from '@/components/ui/button'
import { DataTable } from './DataTable'
export const Main = ()=>{
    return (
        <div className={styles.main}>
            {/* <div className={styles.category}>
                <Button className="rounded-full">前端</Button>
                <Button className="rounded-full">后端</Button>
                <Button className="rounded-full">AI算法</Button>
            </div>
            <div className={styles.tags}>
                <span className={styles.tag}>
                    <span>js</span>
                    <span className={styles.count}>102</span>
                </span>
                <span className={styles.tag}>
                    <span>js</span>
                    <span className={styles.count}>102</span>
                </span>
                <span className={styles.tag}>
                    <span>js</span>
                    <span className={styles.count}>102</span>
                </span>
            </div> */}
            <DataTable />
        </div>
    )
}