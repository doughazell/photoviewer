import { Component, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { PhotoViewer, Image, ViewerOptions,
  capShowOptions, capShowResult} from '@capacitor-community/photoviewer';
import { Capacitor } from '@capacitor/core';
//import { Toast } from '@capacitor/toast';

/* FROM: 'angular-photoviewer-app/src/app/components/photoviewer/photoviewer.component.ts'
@Component({
  selector: 'app-photoviewer',
  templateUrl: './photoviewer.component.html',
  styleUrls: ['./photoviewer.component.scss'],
})
export class PhotoviewerComponent implements AfterViewInit {
*/

@Component({
  //selector: 'app-tab1',
  selector: 'app-photoviewerXXX',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements AfterViewInit {

  @Input() imageList: Image[] = [];
  @Input() mode = '';
  @Input() startFrom = 0;
  @Output() pvExit: EventEmitter<any> = new EventEmitter();

  platform: string;
  options: ViewerOptions = {} as ViewerOptions;
  pvPlugin: any;

  // 23/10/24 DH:
  show: any;

  constructor() {
    this.platform = Capacitor.getPlatform();
    this.pvPlugin = PhotoViewer;
    console.log("PhotoviewerComponent.constructor() this.pvPlugin: ", this.pvPlugin);
   }

  async ngAfterViewInit() {
    this.show = async (imageList: Image[], mode: string, startFrom: number, options?: ViewerOptions): Promise<capShowResult> => {
      const opt: capShowOptions = {} as capShowOptions;
      opt.images = imageList;
      opt.mode = mode;
      
      if( mode === 'one' || mode === 'slider') {
        opt.startFrom = startFrom;
      }
      if(options) {
        opt.options = options;
      }

      try {
          const ret = await this.pvPlugin.show(opt);
          if(ret.result) {
              return Promise.resolve(ret);
          } else {
              return Promise.reject(ret.message);
          }
      } catch (err: any) {
          const ret: capShowResult = {} as capShowResult;
          ret.result = false;
          ret.message = err.message;
          return Promise.reject(err.message);
      }
    };
    const showToast = async (message: string) => {
      /*
      await Toast.show({
          text: message,
          position: 'center',
          duration: 'long'
      });
      */
    };

    const echo = await this.pvPlugin.echo({value:'Hello from PhotoViewer'});

    if(!echo.value) {
        await showToast('no value to echo');
    } else {
      console.log(`echo ${echo.value}`);
    }

    this.pvPlugin.addListener('jeepCapPhotoViewerExit', (e: any) => {
      console.log(`&&& event ${JSON.stringify(e)}`);
      this.pvExit.emit(e);
    });

    this.showPicture();

  } // END: --- "ngAfterViewInit()" ---

  async showPicture() {
    try {
      // **************************************
      // here you defined the different options
      // **************************************
      // uncomment the following desired lines below
      // this.options.title = false;
      // this.options.share = false;
      // this.options.transformer = "depth";
      // this.options.spancount = 2

      this.options.maxzoomscale = 3;
      this.options.compressionquality = 0.6;
      this.options.backgroundcolor = 'white';
      
      this.options.movieoptions = {mode: 'portrait', imagetime: 3};

      if (this.imageList != null && this.imageList.length > 0) {

        this.startFrom = 3;

        // 23/10/24 DH: The primary input to displaying picture
        console.log("this.imageList: ", this.imageList);
        console.log("this.mode: ", this.mode);
        console.log("this.startFrom: ", this.startFrom);
        console.log("this.options: ", this.options);

        // 'show()' defined in 'ngAfterViewInit()' (ie we're in it...!!!)
        const result = await this.show(this.imageList, this.mode, this.startFrom, this.options);
        
        // base64 images call
        //ret = await show(base64List, options);
        
        if(!result.result) {
            //await showToast(result.message);
            this.pvExit.emit({result: result.result, message: result.message});
        }
        if(result.result && Object.keys(result).includes('message')) {
            //await showToast(result.message);
            this.pvExit.emit({result: result.result, message: result.message});
        }

      }
    } catch (err) {
        //await showToast(err);
        this.pvExit.emit({result: false, message: err});
    }
  } // END --- "showPicture()" ---

  async ngOnInit() {
    this.imageList = [
      {url: 'https://i.ibb.co/L1m1NxP/girl.jpg', title: 'Mountain Girl'},
      {url: 'https://i.ibb.co/wBYDxLq/beach.jpg', title: 'Beach Houses'},
      {url: 'https://i.ibb.co/gM5NNJX/butterfly.jpg', title: 'Butterfly'},
      {url: 'https://i.ibb.co/10fFGkZ/car-race.jpg', title: 'Car Racing'},
      {url: 'https://i.ibb.co/ygqHsHV/coffee-milk.jpg', title: 'Coffee with Milk'},
      {url: 'https://i.ibb.co/7XqwsLw/fox.jpg', title: 'Fox'},
      //{url: 'https://i.ibb.co/L1m1NxP/girl.jpg', title: 'Mountain Girl'},
      {url: 'https://i.ibb.co/wc9rSgw/desserts.jpg', title: 'Desserts Table'},

      {url: 'https://i.picsum.photos/id/1009/5000/7502.jpg?hmac=Uj6crVILzsKbyZreBjHuMiaq_-n30qoHjqP0i7r30r8', title: 'Surfer'},
      {url: 'https://i.picsum.photos/id/1011/5472/3648.jpg?hmac=Koo9845x2akkVzVFX3xxAc9BCkeGYA9VRVfLE4f0Zzk', title: 'On a Lac'},
      
      {url: 'https://i.ibb.co/wdrdpKC/kitten.jpg', title: 'Kitten'},
      {url: 'https://i.ibb.co/dBCHzXQ/paris.jpg', title: 'Paris Eiffel'},
      {url: 'https://i.ibb.co/JKB0KPk/pizza.jpg', title: 'Pizza Time'},
      {url: 'https://i.ibb.co/VYYPZGk/salmon.jpg', title: 'Salmon '}
    ];
    
    //this.imageList.push(base64Images[0]);
    //this.imageList.push(base64Images[1]);

    if (this.platform === 'ios') {
      this.imageList.push({url: 'file:///var/mobile/Media/DCIM/100APPLE/IMG_0001.JPG', title: 'Image1'});
      this.imageList.push({url: 'file:///var/mobile/Media/DCIM/100APPLE/IMG_0002.JPG', title: 'Image2'});
      this.imageList.push({url: 'capacitor://localhost/_capacitor_file_/var/mobile/Containers/Data/Application/0C6DDAA3-1486-43E1-A7A8-2E9B39107F32/Documents/photo1.jpg', title: 'ImageFromDocument'});
    }
    if (this.platform === 'android') {
      this.imageList.push({url: 'file:///sdcard/DCIM/IMG_0001.JPG', title: 'Image1'});
      this.imageList.push({url: 'file:///sdcard/DCIM/IMG_0002.JPG', title: 'Image2'});
      this.imageList.push({url: 'file:///sdcard/Pictures/IMG_0003.JPG', title: 'Image3'});
      this.imageList.push({url: 'http://localhost/_capacitor_file_/storage/emulated/0/Pictures/JPEG_20221001_113835_7582877022250987909.jpg', title: 'Imagelocalhost'});
      this.imageList.push({url: 'capacitor://localhost/_capacitor_file_/storage/emulated/0/Pictures/JPEG_20221001_102529_2463134056977343449.jpg', title: 'Imagelocalhost'});
    }
    
    //this.startFrom = 2;

    const pathIOS = Capacitor.convertFileSrc('file:///var/mobile/Media/DCIM/100APPLE/IMG_0001.JPG');
    const pathAndroid = Capacitor.convertFileSrc('file:///sdcard/DCIM/IMG_0001.JPG');
    console.log(`pathIOS: ${pathIOS}`);
    console.log(`pathAndroid: ${pathAndroid}`);
  }
  handleExit(ev: any){
    console.log(`&&& ev: ${JSON.stringify(ev)}`);
    const keys = Object.keys(ev);
    if(keys.includes('result') &&ev.result) {
      if(keys.includes('imageIndex')) {
        console.log(`last image index: ${ev.imageIndex}`);
      }
    }
    if(keys.includes('message')) {
      console.log(`returned message: ${ev.message}`);
    }
    //this.router.navigateByUrl('/home');
  }


}
