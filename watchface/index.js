import { gettext } from 'i18n'

let normal_image_img = ''
let normal_analog_clock_normal_hour_p_img = ''
let normal_analog_clock_normal_minute_p_img = ''
let normal_analog_clock_normal_second_p_img = ''
let normal_analog_clock_normal_second_p_sw_img = ''
let normal_analog_clock_smooth_hour_p_img = ''
let normal_analog_clock_smooth_minute_p_img = ''
let normal_analog_clock_smooth_second_p_img = ''
let normal_analog_clock_smooth_second_p_sw_img = ''
let back_cover_img = ''
let normal_timerUpdateSec = undefined;
let normal_timerUpdateSecSmooth = undefined;
let lastTime = 0;
let timeSensor = ''
let second_pointer_mode = 0;
let skin_number = 0;
let back_number = 0;
let vibrate = undefined
let step_pointer_widget_array = new Array();
let heart_rate_pointer_widget_array = new Array();
let battery_pointer_widget_array = new Array();
let widgetDelegate = undefined

WatchFace({
  init_view() {
    
    const uk_UA = 18;
    const SM_SMOOTH = 0;
    const SM_STEP = 1;
    const SM_WITHOUT = 2;

    const small_digits_array = ["sd0.png","sd1.png","sd2.png","sd3.png","sd4.png","sd5.png","sd6.png","sd7.png","sd8.png","sd9.png"];
    const big_digits_array = ["bd0.png","bd1.png","bd2.png","bd3.png","bd4.png","bd5.png","bd6.png","bd7.png","bd8.png","bd9.png"];
    const month_array_en = ["m_en1.png","m_en2.png","m_en3.png","m_en4.png","m_en5.png","m_en6.png","m_en7.png","m_en8.png","m_en9.png","m_en10.png","m_en11.png","m_en12.png"];
    const month_array_ua = ["m_ua1.png","m_ua2.png","m_ua3.png","m_ua4.png","m_ua5.png","m_ua6.png","m_ua7.png","m_ua8.png","m_ua9.png","m_ua10.png","m_ua11.png","m_ua12.png"];;
    const color_array = ["color1.png","color2.png","color3.png","color4.png","color5.png","color6.png","color7.png","color8.png","color9.png","color10.png","color11.png","color12.png","color13.png"];
    const back_cover_array = ["bg_0.png","bg_1.png","bg_2.png","bg_3.png","bg_4.png"];
    const big_point_array = ["ab1.png","ab2.png","ab3.png","ab4.png","ab5.png","ab6.png","ab7.png","ab8.png","ab9.png","ab10.png","ab11.png","ab12.png","ab13.png"];
    const small_point_array = ["as1.png","as2.png","as3.png","as4.png","as5.png","as6.png","as7.png","as8.png","as9.png","as10.png","as11.png","as12.png","as13.png"];
    const language = hmSetting.getLanguage()
    let month_array = month_array_en;
    
    skin_number = 0 + hmFS.SysProGetInt('skin_number');
    second_pointer_mode = 0 + hmFS.SysProGetInt('second_pointer_mode');
    back_number = 0 + hmFS.SysProGetInt('back_number');

    const deviceInfo = hmSetting.getDeviceInfo();
    vibrate = hmSensor.createSensor(hmSensor.id.VIBRATE)

    function short_vibro(){
      vibrate.stop()
      vibrate.scene = 24
      vibrate.start()
    }

    switch(language){
      case uk_UA: {
        month_array = month_array_ua;
        break;
      }
      //case language_COUNTRY ......
      default: month_array = month_array_en
    }

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 454,
      h: 454,
      color: '0xFF000000',
      show_level: hmUI.show_level.ONLY_AOD,
    });

    back_cover_img = hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      w: 454,
      h: 454,
      src: back_cover_array[back_number],
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      src: 'base.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    normal_image_img = hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      src: color_array[skin_number],
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      src: 'edge.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.IMG_DATE, {
      day_startX: 207,
      day_startY: 152,
      day_sc_array: big_digits_array,
      day_tc_array: big_digits_array,
      day_en_array: big_digits_array,
      day_zero: 1,
      day_space: 0,
      day_align: hmUI.align.CENTER_H,
      day_is_character: false,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.IMG_DATE, {
      month_startX: 197,
      month_startY: 121,
      month_sc_array: month_array,
      month_tc_array: month_array,
      month_en_array: month_array,
      month_is_character: true ,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    for(let i = 0; i < color_array.length; i++){
      step_pointer_widget_array.push(
        hmUI.createWidget(hmUI.widget.IMG_POINTER, {
          src: big_point_array[i],
          center_x: 226,
          center_y: 341,
          x: 16,
          y: 71,
          start_angle: -120,
          end_angle: 120,
          type: hmUI.data_type.STEP,
          show_level: hmUI.show_level.ONLY_NORMAL,
        }));

        heart_rate_pointer_widget_array.push(
          hmUI.createWidget(hmUI.widget.IMG_POINTER, {
            src: small_point_array[i],
            center_x: 130,
            center_y: 227,
            x: 15,
            y: 71,
            start_angle: -30,
            end_angle: 210,
            type: hmUI.data_type.HEART,
            show_level: hmUI.show_level.ONLY_NORMAL,
          })
        );

        battery_pointer_widget_array.push(
          hmUI.createWidget(hmUI.widget.IMG_POINTER, {
            src: small_point_array[i],
            center_x: 322,
            center_y: 228,
            x: 15,
            y: 71,
            start_angle: -210,
            end_angle: 30,
            type: hmUI.data_type.BATTERY,
            show_level: hmUI.show_level.ONLY_NORMAL,
          })
        );
    }

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

    normal_analog_clock_normal_hour_p_img = hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      hour_path: 'ah.png',
      hour_centerX: 227,
      hour_centerY: 227,
      hour_posX: 22,
      hour_posY: 227,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      hour_path: 'ahi.png',
      hour_centerX: 227,
      hour_centerY: 227,
      hour_posX: 22,
      hour_posY: 227,
      show_level: hmUI.show_level.ONLY_AOD,
    });

    normal_analog_clock_normal_minute_p_img = hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      minute_path: 'am.png',
      minute_centerX: 227,
      minute_centerY: 227,
      minute_posX: 22,
      minute_posY: 227,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      minute_path: 'ami.png',
      minute_centerX: 227,
      minute_centerY: 227,
      minute_posX: 22,
      minute_posY: 227,
      show_level: hmUI.show_level.ONLY_AOD,
    });

    normal_analog_clock_normal_second_p_sw_img = hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      second_path: 'assh.png',
      second_centerX: 233,
      second_centerY: 235,
      second_posX: 20,
      second_posY: 205,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    normal_analog_clock_normal_second_p_img = hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      second_path: 'as.png',
      second_centerX: 227,
      second_centerY: 227,
      second_posX: 12,
      second_posY: 199,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    normal_analog_clock_smooth_hour_p_img = hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      w: deviceInfo.width,
      h: deviceInfo.height,
      pos_x: 227 - 22,
      pos_y: 227 - 227,
      center_x: 227,
      center_y: 227,
      src: 'ah.png',
      angle: 0,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });



    normal_analog_clock_smooth_minute_p_img = hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      w: deviceInfo.width,
      h: deviceInfo.height,
      pos_x: 227 - 22,
      pos_y: 227 - 227,
      center_x: 227,
      center_y: 227,
      src: 'am.png',
      angle: 0,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    normal_analog_clock_smooth_second_p_sw_img = hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      w: deviceInfo.width,
      h: deviceInfo.height,
      pos_x: 233 - 20,
      pos_y: 235 - 205,
      center_x: 233,
      center_y: 235,
      src: 'assh.png',
      angle: 0,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
   
    normal_analog_clock_smooth_second_p_img = hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      w: deviceInfo.width,
      h: deviceInfo.height,
      pos_x: 227 - 12,
      pos_y: 227 - 199,
      center_x: 227,
      center_y: 227,
      src: 'as.png',
      angle: 0,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });

    function setVisibility(number){
      for(let i = 0;i < color_array.length; i++){
        step_pointer_widget_array[i].setProperty(hmUI.prop.VISIBLE,number==i)
        heart_rate_pointer_widget_array[i].setProperty(hmUI.prop.VISIBLE,number==i)
        battery_pointer_widget_array[i].setProperty(hmUI.prop.VISIBLE,number==i)  
      }
    }

    setVisibility(skin_number);

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 86,
      y: 183,
      w: 90,
      h: 90,
      text: '',
      normal_src: 'btn.png',  // transparent image
      press_src: 'btn.png',  // transparent image
      show_level: hmUI.show_level.ONLY_NORMAL,
      click_func: () => {
        short_vibro();
        hmApp.startApp({url: "heart_app_Screen", native: true});
      }
    });

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 52,
      y: 49,
      w: 80,
      h: 80,
      text: '',
      normal_src: 'btn.png',  // transparent image
      press_src: 'btn.png',  // transparent image
      show_level: hmUI.show_level.ONLY_NORMAL,
      click_func: () => {
        short_vibro();
        hmApp.startApp({url: "WeatherScreen", native: true});
      }
    });

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 195,
      y: 144,
      w: 64,
      h: 64,
      text: '',
      normal_src: 'btn.png',  // transparent image
      press_src: 'btn.png',  // transparent image
      show_level: hmUI.show_level.ONLY_NORMAL,
      click_func: () => {
        short_vibro();
        hmApp.startApp({url: "ScheduleCalScreen", native: true});
      }
    });

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 176,
      y: 290,
      w: 100,
      h: 100,
      text: '',
      normal_src: 'btn.png',  // transparent image
      press_src: 'btn.png',  // transparent image
      show_level: hmUI.show_level.ONLY_NORMAL,
      click_func: () => {
        short_vibro();
        hmApp.startApp({url: "activityAppScreen", native: true});
      }
    });

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 49,
      y: 326,
      w: 80,
      h: 80,
      text: '',
      normal_src: 'btn.png',  // transparent image
      press_src: 'btn.png',  // transparent image
      show_level: hmUI.show_level.ONLY_NORMAL,
      click_func: () => {
        short_vibro();
        hmApp.startApp({url: "AlarmInfoScreen", native: true});
      }
    });

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 277,
      y: 183,
      w: 90,
      h: 90,
      text: '',
      normal_src: 'btn.png',  // transparent image
      press_src: 'btn.png',  // transparent image
      show_level: hmUI.show_level.ONLY_NORMAL,
      click_func: () => {
        short_vibro();
        hmApp.startApp({url: "LowBatteryScreen", native: true});
      }
    });

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 329,
      y: 326,
      w: 80,
      h: 80,
      text: '',
      normal_src: 'btn.png',  // transparent image
      press_src: 'btn.png',  // transparent image
      show_level: hmUI.show_level.ONLY_NORMAL,
      click_func: () => {
        short_vibro();
        hmApp.startApp({url: 'PhoneContactsScreen', native: true });
      }
    });

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 326, 
      y: 59,  
      text: '',
      w: 66, 
      h: 66,  
      normal_src: 'btn.png',  
      press_src: 'btn.png',  
      show_level: hmUI.show_level.ONLY_NORMAL,
      click_func: () => {
        short_vibro()
        skin_number++;
        if(skin_number>(color_array.length-1)) {
          skin_number = 0
        }
        hmFS.SysProSetInt('skin_number',skin_number);
        normal_image_img.setProperty(hmUI.prop.SRC,color_array[skin_number]);
        setVisibility(skin_number); 
      }
    });

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 192,  
      y: 52,  
      text: '',
      w: 70,  
      h: 50,  
      normal_src: 'btn.png',  
      press_src: 'btn.png',  
      show_level: hmUI.show_level.ONLY_NORMAL,
      click_func: () => {
        short_vibro();
        back_number++;
        if(back_number>back_cover_array.length-1) {
          back_number = 0
        }
        hmFS.SysProSetInt('back_number',back_number);
        back_cover_img.setProperty(hmUI.prop.SRC,back_cover_array[back_number]);
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
      normal_analog_clock_smooth_second_p_img.setProperty(hmUI.prop.ANIM, secAnim);
      normal_analog_clock_smooth_second_p_sw_img.setProperty(hmUI.prop.ANIM, secAnim);
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
        if (normal_analog_clock_smooth_hour_p_img) normal_analog_clock_smooth_hour_p_img.setProperty(hmUI.prop.ANGLE, normal_angle_hour);
      };

      if (updateMinute) {
        let normal_fullAngle_minute = 360;
        let normal_angle_minute = 0 + normal_fullAngle_minute*(minute + second/60)/60;
        if (normal_analog_clock_smooth_minute_p_img) normal_analog_clock_smooth_minute_p_img.setProperty(hmUI.prop.ANGLE, normal_angle_minute);
      };

    };

    if (!timeSensor) timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    timeSensor.addEventListener(timeSensor.event.MINUTEEND, function() {
      time_update(true, true);
    });
    let screenType = hmSetting.getScreenType();

    function resumeCall(){
      time_update(true, true);
      if (screenType === hmSetting.screen_type.WATCHFACE) {
        if (!normal_timerUpdateSec) {
          let animDelay = timeSensor.utc % 1000;
          let animRepeat = 1000;
          normal_timerUpdateSec = timer.createTimer(animDelay, animRepeat, (function (option) {
            time_update(false, true);
          }));   
        };  
      };  

      let secAngle = 0 + (360*6)*(timeSensor.second + ((timeSensor.utc % 1000) / 1000))/360;
      normal_analog_clock_smooth_second_p_img.setProperty(hmUI.prop.ANGLE, secAngle);
      normal_analog_clock_smooth_second_p_sw_img.setProperty(hmUI.prop.ANGLE, secAngle);
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
          }));  
        };  
      };
    }

    function pauseCall(){
      if (normal_timerUpdateSec) {
        timer.stopTimer(normal_timerUpdateSec);
        normal_timerUpdateSec = undefined;
      }
      if (normal_timerUpdateSecSmooth) {
        timer.stopTimer(normal_timerUpdateSecSmooth);
        normal_timerUpdateSecSmooth = undefined;
      }
    }

    function delegate(){
      if(second_pointer_mode==SM_SMOOTH){
        widgetDelegate = hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
          resume_call: ()=>{
            resumeCall();
          },
          pause_call: ()=>{
            pauseCall();
          },
        });
        resumeCall();
      } else {
        if(widgetDelegate){
          hmUI.deleteWidget(widgetDelegate);
          widgetDelegate = undefined;
        }
      }
    }

    function setSecondVisibility(mode){
      normal_analog_clock_smooth_hour_p_img.setProperty(hmUI.prop.VISIBLE,mode==SM_SMOOTH);
      normal_analog_clock_smooth_minute_p_img.setProperty(hmUI.prop.VISIBLE,mode==SM_SMOOTH);
      normal_analog_clock_smooth_second_p_img.setProperty(hmUI.prop.VISIBLE,mode==SM_SMOOTH);
      normal_analog_clock_smooth_second_p_sw_img.setProperty(hmUI.prop.VISIBLE,mode==SM_SMOOTH);
      normal_analog_clock_normal_hour_p_img.setProperty(hmUI.prop.VISIBLE,mode==SM_STEP || mode==SM_WITHOUT);
      normal_analog_clock_normal_minute_p_img.setProperty(hmUI.prop.VISIBLE,mode==SM_STEP || mode==SM_WITHOUT);
      normal_analog_clock_normal_second_p_img.setProperty(hmUI.prop.VISIBLE,mode==SM_STEP);
      normal_analog_clock_normal_second_p_sw_img.setProperty(hmUI.prop.VISIBLE,mode==SM_STEP);
      delegate();
    }
 
    setSecondVisibility(second_pointer_mode)

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 203,  
      y: 203,  
      text: '',
      w: 50,  
      h: 50,  
      normal_src: 'btn.png',  
      press_src: 'btn.png',  
      show_level: hmUI.show_level.ONLY_NORMAL,
      click_func: () => {
        short_vibro();
        second_pointer_mode++;
        if(second_pointer_mode>2) {
          second_pointer_mode = 0
        }
        hmFS.SysProSetInt('second_pointer_mode',second_pointer_mode);
        setSecondVisibility(second_pointer_mode); 
      }
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
    vibrate && vibrate.stop()
    console.log('index page.js on destroy invoke')
  },
})
