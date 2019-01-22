Component({
    properties: {
        name:{
            type:String,
            value:"三只松鼠猪肉铺三只松鼠猪肉铺"
        },
        price:{
            type:Number,
            value:16.90
        },
        saleVolume:{
            type:Number,
            value:20
        },
        pictureUrl:{
            type:String,
            value:""
        }
    },
    methods: {
        _listFunction:function(){
           this.triggerEvent('listFunction')
        }
    }
})