import '../assets/styles/footer.styl'
// jsx文件就是把HTML写在js的代码里边，并不像.vue文件一样，jsx本身使用的是js语法，里面可以写html语法
//jsx文件可以做任何js运算 
export default {
    // 变量的传递方式  {this.author}来使用变量作为参数，与.vue文件中的调用方法差不多  [].map(())
    data() {
        return {
            author: 'wxcYa',
            blog: 'wxcya.cn'
        }
    },
    render() {
        return (
           
            <div id="footer">
                <span>Power by {this.author}，欢迎访问作者博客：{this.blog}</span>
                <br/>
                <span>Hosted by Coding Pages</span>
            </div>
        )
    }
} 