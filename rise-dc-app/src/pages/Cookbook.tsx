import styles from './Page.module.css'
import ListScroll from '../shared/components/ListScroll'
import { Ingredient } from '../shared/types'

export default function Cookbook() {
  return (
    <div className={styles.container}>
      <h1>Adaptive Digital Cookbook</h1>
      <p>Digital cookbook for users with cognitive and literacy challenges</p>
      <ListScroll items={[{name:"hi", id:"1", image_id:"1"}, {name:"hi", id:"1", image_id:"1"}, {name:"hi", id:"1", image_id:"1"}, {name:"hi", id:"1", image_id:"1"}, {name:"hi", id:"1", image_id:"1"}, {name:"hi", id:"1", image_id:"1"}, {name:"hi", id:"1", image_id:"1"}, {name:"hi", id:"1", image_id:"1"}]}/>
    </div>


  )
}