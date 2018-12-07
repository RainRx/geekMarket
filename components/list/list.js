Component({
    properties: {
        imageUrl:{
            type:String,
            value:'../../pages/img/computer.png'
        },
        placeholder:{
            type:String,
            value:''
        },
        title:{
            type:String,
            value:'购物指南'
        }
    },
    methods: {
        _listFunction:function(){
           this.triggerEvent('listFunction')
        }
    }
})