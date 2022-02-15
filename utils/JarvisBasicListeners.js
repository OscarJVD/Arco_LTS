Jarvis.when("ERROR", function (data) {
  console.error(data);
});

Jarvis.when("SPEECH_SYNTHESIS_START", function () {
  if (Jarvis.isRecognizing() || Jarvis.isSpeaking()) {
    Jarvis.dontObey();
  }
});

Jarvis.when("SPEECH_SYNTHESIS_END", function () {
  setTimeout(() => {
    if (!Jarvis.isRecognizing() || !Jarvis.isSpeaking()) {
      Jarvis.obey();
    }
  }, 1000);
});

// TRACK LISTENERS
document.getElementById('openquestionTrack').addEventListener('ended', () => {
  document.getElementById('buttonsBox').classList.add('d-none');
  document.querySelectorAll('video').forEach(video => video.style.height = '100%');
})

document.getElementById('respuestaTrack').addEventListener('ended', () => {

  if (document.getElementById("videoMsgRespuesta"))
    document.getElementById("videoMsgRespuesta").classList.add("d-none");

  // Jarvis.fatality(); // stop artyom if stills active

  // setTimeout(() => {
  //   startArtyom('es-ES', respuestaMode);
  // }, 250)
});

document.getElementById('galeriasTrack').addEventListener('ended', () => {
  document.getElementById('btnGallery').classList.remove('blueHover')
  timeouts.push(setTimeout(() => { playVideo('tellmoreTrack') }, 1500))
});

document.getElementById('tellmoreTrack').addEventListener('ended', () => {
  document.getElementById("buttonsPartOne").classList.add('d-none')
  document.getElementById("buttonsPartBox").classList.add('d-none')
  document.getElementById("YesOrNoBox").classList.remove('d-none')
  if (document.getElementById('btnVideoCenter') && !document.getElementById('btnVideoCenter').classList.contains('d-none'))
    document.getElementById('btnVideoCenter').classList.add('d-none')
});

document.querySelectorAll('video').forEach(elem => {
  if (elem.id != 'reposoTrack') {
    elem.addEventListener('play', function () {
      Jarvis.dontObey();
    });

    elem.addEventListener('ended', function () {
      setTimeout(() => {
        Jarvis.obey();
      }, 1000);
    });
  }
});
// END TRACK LISTENERS


document.querySelectorAll('button').forEach(button => {
  let btnRestart = document.getElementById('btnReset')
  if (button.id != 'btnReset'
  //  && button.id != 'btnActiveRecognizer'
   ) {
    button.addEventListener('click', () => {
      btnRestart.removeAttribute('disabled')
    })
  }
})

document.getElementById('btnReset').addEventListener('click', async () => {

  let videoElements = document.querySelectorAll('.videoIA');

  videoElements.forEach(video => {
    if (video.id != 'reposoTrack') {
      let videoSrc = video.src
      video.pause();
      video.removeAttribute('src'); // empty source
      // video.load();
      video.pause();
      video.setAttribute('src', videoSrc)
      video.load();
    }
  });

  let cont = 0;
  let id = setInterval(function () {
    clearTimeOuts(timeouts)
    cont++;
    if (cont == 10) clearInterval(id);
  }, 100);

  document.getElementById('talkBtnBox').style.position = "fixed"
  document.getElementById("buttonsPartOne").classList.remove('d-none')
  document.getElementById("buttonsPartBox").classList.remove('d-none')
  document.getElementById('buttonsBox').classList.remove('d-none');
  document.querySelectorAll('video').forEach(video => video.style.height = '71%');
  document.getElementById('buttonsBox').classList.remove('d-none');
  document.getElementById("YesOrNoBox").classList.add('d-none')
  document.getElementById('talkBtnBox').classList.remove('d-none')
  await playVideo('reposoTrack')
  Jarvis.ArtyomWebkitSpeechRecognition.stop()
})

document.getElementById('btnNo').addEventListener('click', function () {
  playVideo("openquestionTrack")
})

document.getElementById('btnActiveRecognizer').addEventListener('click', function () {
  document.getElementById('btnTalkLoader').classList.remove('d-none')
  document.getElementById('microphoneIcon').classList.add('d-none')
  startArtyom("es-ES", 'quick', false);
});
