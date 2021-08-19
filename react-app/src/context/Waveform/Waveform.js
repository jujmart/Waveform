const container = document.getElementById('container');
const canvas = document.getElementById('canvas1')
const file = document.getElementById('fileupload')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d')
const audioContext = new AudioContext();
let audioSource
let anaylser;

//plays by clicking in the black area
container.addEventListener('click', function(){
    console.log(audioContext)
    // let audio1 = new Audio('ACTION (feat. Taka Moriuchi, Tyler Carter, Caleb Shomo, Tilian).mp3');
    const audio1 = document.getElementById('audio1');
    audio1.src = 'ACTION (feat. Taka Moriuchi, Tyler Carter, Caleb Shomo, Tilian).mp3'

    audio1.play();
    //creates audio node
    audioSource = audioContext.createMediaElementSource(audio1)
    anaylser = audioContext.createAnalyser();
    audioSource.connect(anaylser)
    anaylser.connect(audioContext.destination)
    //useable values for anaylser.fftSize =>  32 64 128 256 512 1024 2048 4096 8192 16384 32768 Default= 2048
    anaylser.fftSize = 512;
    //bufferLength is half of size above
    const bufferLength = anaylser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const barWidth = 15;
    let barHeight
    let x;

    function animate(){
        x = 0;
        //built in method that clears the entire canvas from previous "frame"
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        anaylser.getByteFrequencyData(dataArray)
        drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray)

        requestAnimationFrame(animate);
    }
    animate();
})

file.addEventListener('change', function(){
    console.log(audioContext)
    const files = this.files;

    const audio1 = document.getElementById('audio1');
    audio1.src = URL.createObjectURL(files[0]);
    audio1.load();
    audio1.play()

    audioSource = audioContext.createMediaElementSource(audio1)
    anaylser = audioContext.createAnalyser();
    audioSource.connect(anaylser)
    anaylser.connect(audioContext.destination)
    //useable values for anaylser.fftSize =>  32 64 128 256 512 1024 2048 4096 8192 16384 32768 Default= 2048
    anaylser.fftSize = 2048;
    //bufferLength is half of size above
    const bufferLength = anaylser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const barWidth = (canvas.width/2)/bufferLength;
    let barHeight
    let x;

    function animate(){
        x = 0;
        //built in method that clears the entire canvas from previous "frame"
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        anaylser.getByteFrequencyData(dataArray)

        drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray)
        requestAnimationFrame(animate);
    }
    animate();
})

function drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray){
    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 1.5 + 50;
        ctx.save();
        //sets center point for the canvas rotation: center
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(i * Math.PI * 8/ bufferLength )

        // const red = i * barHeight/ 20;
        // const green = i * 4;
        // const blue = barHeight/2;
        // ctx.fillStyle = 'white'
        // ctx.fillRect(canvas.width/2 - x, canvas.height - barHeight - 30, barWidth, 15);
        // ctx.fillRect(0, 0, barWidth, 15);

        const hue = i/2;
        ctx.fillStyle = 'hsl(' + hue + ',100%, 50%)'
        // ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
        ctx.fillRect(0, 0, barWidth, barHeight);
        // ctx.fillRect(canvas.width/2 - x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth;
        ctx.restore();
    }
