const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STRORATE_KEY = 'Hung'

const playList =$('.play_list')
const CD = $('.CD')
const cdWidth = CD.offsetWidth
const heading= $('header p')
const cdImage = $('.cd_thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const ramdomBtn = $('.btn-ramdom')
const repeatBtn = $('.btn-repeat')

const app = {
    currentIndex : 0,
    isplaying : false,
    isRamdom : false,
    isRepeat : false,
    ramdomIndex : [],
    config: JSON.parse(localStorage.getItem(PLAYER_STRORATE_KEY)) || {},
    setConfig: function (key, value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_STRORATE_KEY,JSON.stringify(this.config) )
    },
    songs :  [
        {
            name: 'Đơn Phương',
            singer: 'Nam Em',
            path: './access/muisic/Đơn Phương - Nam Em _ Hơi Thở Âm Nhạc - st Đào Bá Lộc.mp3',
            image: './access/image/images.jfif',
        },
        {
            name: 'Bất quá nhân gian',
            singer: 'chu thúy quỳnh',
            path: './access/muisic/Bất Quá Nhân Gian - Chu Thúy Quỳnh _ MV Official _ Nhạc Hot TikTok 2022.mp3',
            image: './access/image/chu thúy quỳnh.jpg',
        },
        {
            name: 'tay to',
            singer: 'Mck',
            path: './access/muisic/Rapitalove EP_ Tay To - RPT MCK x RPT PhongKhin (Prod. by RPT PhongKhin) [Official Lyric Video].mp3',
            image: './access/image/mck.jpg',
        },
        {
            name: 'old town road',
            singer: 'lil nas x',
            path: './access/muisic/Lil Nas X - Old Town Road (Lyrics) ft. Billy Ray Cyrus.mp3',
            image: './access/image/lil nas x.jpg',
        },
        {
            name: 'cô nàng khác người',
            singer: 'mck',
            path: './access/muisic/Pixel Neko - Cô Nàng Khác Người [feat. Nger (MCK) & Wxrdie] _ Official MV.mp3',
            image: './access/image/mck.jpg',
        },
        {
            name: 'kiếp chung chồng',
            singer: 'Nam em',
            path: './access/muisic/Kiếp Chồng Chung - Nam Em _ Hơi Thở Âm Nhạc - Vừng Ơi st Bùi Công Nam.mp3',
            image: './access/image/images.jfif',
        },
        {
            name: 'đế vương',
            singer: 'Nam em',
            path: './access/muisic/Đế Vương - Nam Em _ Hơi Thở Âm Nhạc - st Đình Dũng.mp3',
            image: './access/image/images.jfif',
        },
        {
            name: 'hãy xem là giấc mơ',
            singer: 'chu bin',
            path: './access/muisic/Hãy Xem Là Giấc Mơ - Chu Bin ( MV OFFICIAL ).mp3',
            image: './access/image/chubin.jpg',
        },
        {
            name: 'one call away',
            singer: 'charlie puth',
            path: './access/muisic/One call away (lyrics) - Charlie Puth.mp3',
            image: './access/image/Charlie Puth.jpg',
        },
        {
            name: 'tình đắng như ly cafe',
            singer: 'mck',
            path: './access/muisic/nân. x Ngơ - tình đắng như ly cà phê _ tas release.mp3',
            image: './access/image/mck.jpg',
        },
        {
            name: 'monsters',
            singer: 'Katie Sky',
            path: './access/muisic/Monsters - Katie Sky (Lyrics + Vietsub) ♫.mp3',
            image: './access/image/Katie Sky.jpg',
        },
        {
            name: 'MONG NHỚ GIA ĐÌNH',
            singer: 'Hoang Hồng quân',
            path: './access/muisic/MONG NHỚ GIA ĐÌNH _ HOÀNG HỒNG QUÂN _ GIỌNG HÁT ĐỘC LẠ 2020 HOTTIKTOK NHẠC ĐỜI.mp3',
            image: './access/image/tải xuống.jpg',
        },
        {
            name: 'yêu là phải thương',
            singer: 'đường hưng',
            path: './access/muisic/YÊU LÀ PHẢI THƯƠNG - ĐƯỜNG HƯNG l VIDEO OFFIFCIAL (cover).mp3',
            image: './access/image/tieu-su-ca-si-duong-hung-10338.jpg',
        },
    ],
    render: function (){
        const htmls = this.songs.map((song,index)=>{
            return `
            <div class="song ${index === app.currentIndex ? 'red':''}" data-index="${index}">
                <div class="thumb" 
                style="background: url('${song.image}') top center / cover no-repeat ;">
                </div>
                <div class="body">
                    <h5>${song.name}</h5>
                    <p>${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fa-solid fa-ellipsis"></i>
                </div>
            </div>
            `
        })
        playList.innerHTML = htmls.join(' ')
    },
    defineProperties: function (){
        Object.defineProperty(this,'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvents: function (){
       
        // xử lí phóng to thu nhỏ CD
        document.onscroll = function () {
            const scrollTop = document.documentElement.scrollTop || window.scrollY
            const newWidth = cdWidth- scrollTop 
            CD.style.width = newWidth > 0? newWidth + 'px': 0
            CD.style.opacity = newWidth/cdWidth
        }
        playBtn.onclick = function () {
            // xử lí click play
            if(app.isplaying){
                audio.pause()
            }else{
                audio.play()
            }

            // xử lí khi play
            audio.onplay = function(){
                app.isplaying = true
                playBtn.classList.add('pause')
                cdthumbAnimate.play()
            }

            // xử lí khi pause
            audio.onpause = function(){
                app.isplaying = false
                playBtn.classList.remove('pause')
                cdthumbAnimate.pause()
            }
            // xử lí thanh chạy
            audio.ontimeupdate = function(){
                if(audio.duration){
                    const progressPercent = audio.currentTime /audio.duration * 100
                     progress.value = progressPercent
                }
                }
            // xử lí seek(tua)
            progress.oninput = function(e){
               const seektime = (audio.duration/100 *e.target.value)
               audio.currentTime = seektime
            }
            
        }
         // xử lí CD quay và dưng
        const cdthumbAnimate = cdImage.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration:10000,
            iterations:Infinity
        })
        cdthumbAnimate.pause()
        // khi next song
        nextBtn.onclick = function (){
            app.isRamdom === true ? app.ramdomSong() : app.nextSong()
            playBtn.classList.add('pause')
            app.setConfig('currentIndex',app.currentIndex)
            audio.play()
            app.render()
            app.scrollToActiveSong()
            return app.isplaying = true
        }
        prevBtn.onclick = function (){
            app.isRamdom === true ? app.ramdomSong() : app.prevSong()
            playBtn.classList.add('pause')
            app.setConfig('currentIndex',app.currentIndex)
            audio.play()
            app.render()
            app.scrollToActiveSong()
            return app.isplaying = true
        }
        ramdomBtn.onclick = function (){
            app.isRamdom = !app.isRamdom
            ramdomBtn.classList.toggle('red',app.isRamdom)
            app.setConfig('isRamdom',app.isRamdom)
            app.setConfig('isRepeat',false)
            if(app.isRepeat){
                repeatBtn.classList.remove('red')
            }
            return app.isRepeat = false
        }
        audio.onended = function (){
           app.isRepeat === true ? audio.play() : nextBtn.click()
        }
        repeatBtn.onclick = function(){
            app.isRepeat = !app.isRepeat
            repeatBtn.classList.toggle('red',app.isRepeat)
            app.setConfig('isRepeat',app.isRepeat)
            app.setConfig('isRamdom',false)
            if(app.isRamdom){
                ramdomBtn.classList.remove('red')
            }
            return app.isRamdom = false
        }
        playList.onclick = function(e){
            const songNode =e.target.closest('.song:not(.red)')

            if (songNode || e.target.closest('.option')){
                // xử lí khi nhấn chọn bài hát
                if(songNode){
                    app.currentIndex = Number(songNode.dataset.index)
                    app.setConfig('currentIndex',app.currentIndex)
                    app.loadCurrentSong()
                    app.render()
                    playBtn.classList.add('pause')
                    audio.play()
                    return app.isplaying = true
                }
            } 
        }
    },
    scrollToActiveSong:function () {
        if(app.currentIndex === 0 || app.currentIndex === 1 || app.currentIndex === 2 || app.currentIndex === 3 ){
            setTimeout(()=>{
                window.scrollTo(0,0)
            },200)
            }else {
                setTimeout(()=>{
                    $('.song.red').scrollIntoView({
                        behavior : 'smooth',
                        block :'nearest',
                    })
                },200)
        }
        
    },
    loadConfig: function () {
        this.isRamdom =  this.config.isRamdom
        this.isRepeat = this.config.isRepeat
        this.currentIndex = Number(this.config.currentIndex)
    },
    loadCurrentSong: function (){
        heading.textContent = this.currentSong.name
        cdImage.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    nextSong: function () {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function () {
        this.currentIndex--
        if(this.currentIndex<0){
            this.currentIndex = this.songs.length-1 
        }
        this.loadCurrentSong()
    },
    ramdomSong: function () {
        var newIndex
        do{
            newIndex = Math.floor(Math.random() * this.songs.length)  

            var found = this.ramdomIndex.find(e => e === newIndex)

        } while (newIndex === this.currentIndex || found !== undefined)
        this.currentIndex = newIndex
         this.ramdomIndex.push(this.currentIndex)
         if(this.ramdomIndex.length === this.songs.length){
            this.ramdomIndex= [newIndex]
         }
        this.loadCurrentSong()
    },
    start: function (){
        this.loadConfig()
        // định nghĩa các thuộc tính cho object
        this.defineProperties()
        // lắng nghe xử lý các sự kiện(DOM events)
        this.handleEvents()
        // tải bài hát đầu tiên vào UI(user interface) khi chạy ứng dụng 
        this.loadCurrentSong()
        // render playlist
        this.render()

        ramdomBtn.classList.toggle('red',this.isRamdom)
        repeatBtn.classList.toggle('red',this.isRepeat)
    }
}
app.start()