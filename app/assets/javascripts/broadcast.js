// Generated by CoffeeScript 1.8.0
$(function() {
  var getRecordings, lastRecording, populateSelect, showRecordings, updateAudio;

  lastRecording = new Date('2000-09-27');
  
  getRecordings = function(callback) {
    return $.ajax({
      url: "/fetch_recordings",
      dataType: "json",
      error: function(jqXHR, textStatus, errorThrown) {
        return $('.recording-status').text(textStatus);
      },
      success: function(data, textStatus, jqXHR) {
        showRecordings(data);
        if (callback) {
          return callback();
        }
      }
    });
  };
  
  showRecordings = function(recordings) {
    var newestRecording;
    newestRecording = new Date(recordings[0]['date']);
  
    if (newestRecording > lastRecording) {
      lastRecording = newestRecording;
      return populateSelect(recordings);
    }
  };
  
  populateSelect = function(recordings) {
    var recording, select, _i, _len, _results;
    select = $('#selectRecordings');
    select.empty();
    _results = [];
  
    for (_i = 0, _len = recordings.length; _i < _len; _i++) {
      recording = recordings[_i];
      _results.push((function(recording) {
        return select.append($("<option></option>").val(recording.url).html(recording.date));
      })(recording));
    }
  
    return _results;
  };
  
  updateAudio = function() {
    var selectedUrl;
    selectedUrl = $('#selectRecordings option:selected').val();
    $('#recording-audio').attr('src', selectedUrl);
    return $('#recording-url').attr('value', selectedUrl);
  };
  
  $('.call-me').click(function(e) {
    var phoneNumber;
    e.preventDefault();
    phoneNumber = $('#recordingNumber').val();
    return $.post("/call_recording", {
      phone_number: phoneNumber
    }).done(function(data) {
      $('.recording-status').text('Status: Recording in Progress');
      return setTimeout((function(_this) {
        return function() {
          return $('.recording-status').text('Status: Recording complete!');
        };
      })(this), 20000);
    });
  });
  
  $('.show-make').click(function(e) {
    e.preventDefault();
    return $('.make-recording').toggleClass('slide-down');
  });
  
  $('#selectRecordings').on('change', 'click', function(e) {
    return getRecordings(updateAudio);
  });
  
  $('.preview-btn').click(function(e) {
    e.preventDefault();
    return document.getElementById('recording-audio').play();
  });
  
  return $(document).ready(function() {
    if (window.location.pathname === '/broadcast') {
      getRecordings(updateAudio);
    }
    return console.log(window.location.pathname);
  });
});
