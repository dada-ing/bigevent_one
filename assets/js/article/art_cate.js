$(function () {
    initArtCateList()

    var layer = layui.layer
    var form = layui.form

    // 获取分类列表 
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类列表失败！')
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    // 给添加分类按钮 绑定点击事件 弹出框
    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })

    // 给 form-add 绑定事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败')
                }
                initArtCateList()
                layer.msg('新增分类成功')
                layer.close(indexAdd)

            }
        })
    })

    // 为 编辑 按钮 绑定点击事件
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res){
                form.val('form-edit', res.data)
            }
        })
    })

    // 给 form-edit 绑定事件 
    $('body').on('submit', '#form-edit', function(e){
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res){
                if(res.status != 0){
                    return layer.msg('更新分类失败')
                }
                layer.msg('更新分类成功')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    
    //  为删除按钮 绑定点击事件
    $('tbody').on('click', '.btn-delete', function(){
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res){
                    if(res.status !== 0){
                        return layer.msg('删除分类失败')
                    }
                    layer.msg('删除分类成功')
                    layer.close(index)
                    initArtCateList()
                }
            })
          })
    })


})