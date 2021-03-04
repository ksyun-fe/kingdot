### Basic usage
:::demo #Basic usage Call out a temporary sidebar that can be called out from both left and right directions.
```html
<template>
 <div>
    <Button type='primary' @click="show('left')">Click me to open the left</Button>
    <Button type='primary' @click="show('right')">Click me to open the right</Button>
    <Button type='primary' @click="show('top')">Click me to open the upper</Button>
    <Button type='primary' @click="show('bottom')">Click me to open the lower</Button>
    <Drawer 
            v-model='flag' 
            :position='position'
             >
    </Drawer>
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
                flag:false,
                position:'right'
            }
        },
        methods:{
            show(value){
                this.position=value;
                this.flag=true;
            }
        }
   }
</script>
```
:::

### custom header
:::demo #custom header The title can be set according to the specific needs.

```html
<template>
 <div>
    <Button type='primary' @click="show()">Custom title content</Button>
    <Button type='primary' @click="showOther()">Refactoring title</Button>
    <Button type='primary' @click="show(false)">Hide header</Button>
    <Drawer 
            v-model='flag' 
            :showHeader='headerFlag'
            title="I am a custom title"
             >
    </Drawer>
    <Drawer 
            v-model='flagOther' 
             >
          <div slot="header">
          I'm refactoring the title
          </div>
    </Drawer>
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
                flag:false,
                flagOther:false,
                headerFlag:true,
            }
        },
        methods:{
            showOther(){
                this.flagOther=true;
            },
            show(value){
                this.headerFlag=value
                this.flag=true
            }
        }
   }
</script>
```
:::
### custom footer
:::demo #custom footer Footers can be set according to specific needs.

```html
<template>
 <div>
    <Button type='primary' @click="show()">Custom footer content</Button>
    <Button type='primary' @click="showOther(false)">Hide footer</Button>
    <Drawer 
            v-model='flag' 
             >
            <div slot="footer">
               <Button>
                 custom
               </Button>
            </div>
    </Drawer>
    <Drawer 
            v-model='flagOther' 
            :showFooter='footerFlag'
             >
    </Drawer>
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
                flag:false,
                flagOther:false,
                footerFlag:true,
            }
        },
        methods:{
            showOther(value){
                this.flagOther=true;
                this.footerFlag=false
            },
            show(){
                this.flag=true
            }
        }
   }
</script>
```
:::
### Custom content
:::demo #Custom content Subject content can be set according to specific needs.

```html
<template>
 <div>
    <Button type='primary' @click="show()">Custom content</Button>
    <Drawer 
            v-model='flag' 
             >
             <div>
                Custom content
             </div>
    </Drawer>
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
                flag:false,
            }
        },
        methods:{
            show(){
                this.flag=true
            }
        }
   }
</script>
```
:::

### attribute {.component__content}
| attribute      | explain    | type      | Optional value  | Default value   |
|---------- |-------- |---------- |-------------  |-------- |
| v-model     | Is drawer shown   | boolean    | true / false | false
| showHeader     | Display header   | boolean    | true / false |    true   |
| showFooter  | Whether to display footers   | boolean  |     true / false     |    true   |
| title  | title   | string  |     —     |    —   |
| cancelText  | Cancel button text   | string  |     —     |    —   |
| okText  | Confirm button text   | string  |     —    |    —   |
| mask  | Whether the mask layer is displayed   | boolean  |    true / false     |   true   |
| maskClosable  | Do you click the mask to close the drawer   | boolean  |     true / false     |    false   |
| width  | Drawer width (maximum 800px, default 480px)  | string / number  |   —   |   480  |
| height  | Drawer height (only when the top is ejected, it can be set when the bottom is ejected)   | string / number  |   —   |   300  |
| position  | Drawer eject position | string |  lest / bottom / right / top  |  right |


### Event {.component__content}
| attribute      | explain    | type      | Optional value  | Default value   |
|---------- |-------- |---------- |-------------  |-------- |
| ok  | Events that confirm the execution of the button | function |  —  |  — |
| cancel  | Cancel event executed by button | function |  —  |  — |
### Slot {.component__content}
| attribute      | explain    | type      | Optional value  | Default value   |
|---------- |-------- |---------- |-------------  |-------- |
| header  | header | slot |  —  |  — |
|  body | content | slot |  —  |  — |
|  footer | bottom | slot |  —  |  — |