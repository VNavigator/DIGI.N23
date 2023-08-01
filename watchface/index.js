import { gettext } from 'i18n'

let normal_bg_img = ''
let normal_date_img_date_day = ''
let normal_date_img_date_month_img = ''
let normal_step_pointer_progress_img_pointer = ''
let normal_step_current_text_img = ''
let normal_image_img = ''
let normal_heart_rate_pointer_progress_img_pointer = ''
let normal_heart_rate_text_text_img = ''
let normal_battery_pointer_progress_img_pointer = ''
let normal_battery_text_text_img = ''
let normal_analog_clock_pro_hour_pointer_img = ''
let normal_analog_clock_pro_minute_pointer_img = ''
let normal_timerUpdateSec = undefined;
let normal_analog_clock_pro_second_pointer_img = ''
let normal_timerUpdateSecSmooth = undefined;
let lastTime = 0;
let normal_heart_jumpable_img_click = ''
let timeSensor = ''

WatchFace({
  init_view() {
    
    const uk_UA = 18
    const small_digits_array = ["0014.png","0015.png","0016.png","0017.png","0018.png","0019.png","0020.png","0021.png","0022.png","0023.png"]
    const month_digits_array = ["0024.png","0025.png","0026.png","0027.png","0028.png","0029.png","0030.png","0031.png","0032.png","0033.png"]
    const month_array_en = ["0034.png","0035.png","0036.png","0037.png","0038.png","0039.png","0040.png","0041.png","0042.png","0043.png","0044.png","0045.png"]
    const month_array_ua = ["0046.png","0047.png","0048.png","0049.png","0050.png","0051.png","0052.png","0053.png","0054.png","0055.png","0056.png","0057.png"]
    const bg_array = ['0008.png','0008b.png','0008c.png','0008d.png']
    const big_point_array = ['0001.png','0001b.png','0001c.png','0001d.png']
    const small_point_array = ['0003.png','0003b.png','0003c.png','0003d.png']

    var skin_number = 0;
    skin_number = 0 + hmFS.SysProGetInt('skin_number');

    if(skin_number<0 || skin_number>3) skin_number = 0;
    skin_number = 0;

    var month_array = month_array_en;
    const language = hmSetting.getLanguage()
    switch(language){
      case uk_UA: {
        month_array = month_array_ua;
        break;
      }
      //case lg_CN ......
      default: month_array = month_array_en
    }

    normal_bg_img = hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      w: 454,
      h: 454,
      src: '0010.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      src: '0009.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    normal_image_img = hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      src: bg_array[skin_number],
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      src: '0007.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    normal_date_img_date_day = hmUI.createWidget(hmUI.widget.IMG_DATE, {
      day_startX: 207,
      day_startY: 152,
      day_sc_array: month_digits_array,
      day_tc_array: month_digits_array,
      day_en_array: month_digits_array,
      day_zero: 0,
      day_space: 0,
      day_align: hmUI.align.CENTER_H,
      day_is_character: false,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    normal_date_img_date_month_img = hmUI.createWidget(hmUI.widget.IMG_DATE, {
      month_startX: 197,
      month_startY: 121,
      month_sc_array: month_array,
      month_tc_array: month_array,
      month_en_array: month_array,
      month_is_character: true ,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    normal_step_pointer_progress_img_pointer = hmUI.createWidget(hmUI.widget.IMG_POINTER, {
      src: big_point_array[skin_number],
      center_x: 226,
      center_y: 341,
      x: 16,
      y: 71,
      start_angle: -119,
      end_angle: 120,
      type: hmUI.data_type.STEP,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    normal_step_current_text_img = hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      x: 192,
      y: 374,
      font_array: small_digits_array,
      padding: false,
      h_space: 0,
      align_h: hmUI.align.CENTER_H,
      type: hmUI.data_type.STEP,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    normal_heart_rate_pointer_progress_img_pointer = hmUI.createWidget(hmUI.widget.IMG_POINTER, {
      src: small_point_array[skin_number],
      center_x: 130,
      center_y: 227,
      x: 15,
      y: 71,
      start_angle: -31,
      end_angle: 209,
      type: hmUI.data_type.HEART,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    normal_heart_rate_text_text_img = hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      x: 78,
      y: 218,
      font_array: small_digits_array,
      padding: false,
      h_space: 0,
      align_h: hmUI.align.CENTER_H,
      type: hmUI.data_type.HEART,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    normal_battery_pointer_progress_img_pointer = hmUI.createWidget(hmUI.widget.IMG_POINTER, {
      src: small_point_array[skin_number],
      center_x: 322,
      center_y: 228,
      x: 15,
      y: 71,
      start_angle: -212,
      end_angle: 30,
      type: hmUI.data_type.BATTERY,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    normal_battery_text_text_img = hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      x: 334,
      y: 218,
      font_array: small_digits_array,
      padding: false,
      h_space: 0,
      align_h: hmUI.align.CENTER_H,
      type: hmUI.data_type.BATTERY,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    /* normal_analog_clock_time_pointer_hour = hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      hour_path: '0006.png',
      hour_centerX: 227,
      hour_centerY: 227,
      hour_posX: 22,
      hour_posY: 227,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    normal_analog_clock_time_pointer_minute = hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      minute_path: '0005.png',
      minute_centerX: 227,
      minute_centerY: 227,
      minute_posX: 22,
      minute_posY: 227,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    normal_analog_clock_time_pointer_second = hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      second_path: '0004w.png',
      second_centerX: 227,
      second_centerY: 227,
      second_posX: 22,
      second_posY: 226,
      show_level: hmUI.show_level.ONLY_NORMAL,
    }); */

    

    const deviceInfo = hmSetting.getDeviceInfo();
    if (!timeSensor) timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    timeSensor.addEventListener(timeSensor.event.MINUTEEND, function() {
      time_update(true, true);
    });
    let screenType = hmSetting.getScreenType();

    normal_analog_clock_pro_hour_pointer_img = hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      w: deviceInfo.width,
      h: deviceInfo.height,
      pos_x: 227 - 22,
      pos_y: 227 - 227,
      center_x: 227,
      center_y: 227,
      src: '0006.png',
      angle: 0,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });



    normal_analog_clock_pro_minute_pointer_img = hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      w: deviceInfo.width,
      h: deviceInfo.height,
      pos_x: 227 - 22,
      pos_y: 227 - 227,
      center_x: 227,
      center_y: 227,
      src: '0005.png',
      angle: 0,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    normal_analog_clock_pro_second_pointer_img = hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      w: deviceInfo.width,
      h: deviceInfo.height,
      pos_x: 227 - 22,
      pos_y: 227 - 226,
      center_x: 227,
      center_y: 227,
      src: '0004w.png',
      angle: 0,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    normal_heart_jumpable_img_click = hmUI.createWidget(hmUI.widget.IMG_CLICK, {
      x: 82,
      y: 180,
      w: 96,
      h: 96,
      src: 'btn.png',
      type: hmUI.data_type.HEART,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 326,  // x coordinate of the button
      y: 59,  // y coordinate of the button
      text: '',
      w: 66,  // button width
      h: 66,  // button height
      normal_src: 'btn.png',  // transparent image
      press_src: 'btn.png',  // transparent image
      show_level: hmUI.show_level.ONLY_NORMAL,
      click_func: () => {
        skin_number++;
        if(skin_number<0 || skin_number>3) {
          skin_number = 0
        }
        hmFS.SysProGetInt('skin_number',skin_number);
        
        normal_image_img.setProperty(hmUI.prop.SRC,bg_array[skin_number]);
        normal_step_pointer_progress_img_pointer.setProperty(hmUI.prop.VISIBLE,false);
        normal_heart_rate_pointer_progress_img_pointer.setProperty(hmUI.prop.VISIBLE,false);
        normal_battery_pointer_progress_img_pointer.setProperty(hmUI.prop.VISIBLE,false);
      }
    });

    function startSecAnim(sec, animDuration) {
      const secAnim = {
        anim_rate: 'linear',
        anim_duration: animDuration,
        anim_from: sec,
        anim_to: sec + (360*(animDuration*6/1000))/360,
        repeat_count: 1,
        anim_fps: 25,
        anim_key: 'angle',
        anim_status: 1,
      }
      normal_analog_clock_pro_second_pointer_img.setProperty(hmUI.prop.ANIM, secAnim);
    }

    function time_update(updateHour = false, updateMinute = false) {
      let hour = timeSensor.hour;
      let minute = timeSensor.minute;
      let second = timeSensor.second;

      if (updateHour) {
        let normal_hour = hour;
        let normal_fullAngle_hour = 360;
        if (normal_hour > 11) normal_hour -= 12;
        let normal_angle_hour = 0 + normal_fullAngle_hour*normal_hour/12 + (normal_fullAngle_hour/12)*minute/60;
        if (normal_analog_clock_pro_hour_pointer_img) normal_analog_clock_pro_hour_pointer_img.setProperty(hmUI.prop.ANGLE, normal_angle_hour);
      };

      if (updateMinute) {
        let normal_fullAngle_minute = 360;
        let normal_angle_minute = 0 + normal_fullAngle_minute*(minute + second/60)/60;
        if (normal_analog_clock_pro_minute_pointer_img) normal_analog_clock_pro_minute_pointer_img.setProperty(hmUI.prop.ANGLE, normal_angle_minute);
      };

    };

    const widgetDelegate = hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: (function () {
        time_update(true, true);
        if (screenType == hmSetting.screen_type.WATCHFACE) {
          if (!normal_timerUpdateSec) {
            let animDelay = timeSensor.utc % 1000;
            let animRepeat = 1000;
            normal_timerUpdateSec = timer.createTimer(animDelay, animRepeat, (function (option) {
              time_update(false, true);
            }));  // end timer 
          };  // end timer check
        };  // end screenType

        let secAngle = 0 + (360*6)*(timeSensor.second + ((timeSensor.utc % 1000) / 1000))/360;
        normal_analog_clock_pro_second_pointer_img.setProperty(hmUI.prop.ANGLE, secAngle);
        if (screenType == hmSetting.screen_type.WATCHFACE) {
          if (!normal_timerUpdateSecSmooth) {
            let duration = 0;
            let animDuration = 5000;
            if (timeSensor.second > 55) animDuration = 1000*(60.1 - (timeSensor.second - (timeSensor.utc % 1000) / 1000));
            let diffTime = timeSensor.utc - lastTime;
            if (diffTime < animDuration) duration = animDuration - diffTime;
            normal_timerUpdateSecSmooth = timer.createTimer(duration, animDuration, (function (option) {
              lastTime = timeSensor.utc;
              secAngle = 0 + (360*6)*(timeSensor.second + ((timeSensor.utc % 1000) / 1000))/360;
              startSecAnim(secAngle, animDuration);
            }));  // end timer 
          };  // end timer check
        };  // end screenType


      }),
      pause_call: (function () {
        if (normal_timerUpdateSec) {
          timer.stopTimer(normal_timerUpdateSec);
          normal_timerUpdateSec = undefined;
        }
        if (normal_timerUpdateSecSmooth) {
          timer.stopTimer(normal_timerUpdateSecSmooth);
          normal_timerUpdateSecSmooth = undefined;
        }

      }),
    });

  },
  onInit() {
    console.log('index page.js on init invoke')
  },

  build() {
    this.init_view()
    console.log('index page.js on build invoke')
  },

  onDestroy() {
    console.log('index page.js on destroy invoke')
  },
})
