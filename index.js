function init() {
    const scene = new THREE.Scene();
    //? scene ile sahne oluşturdum.

    const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(5, 5, 10);
    //? kameranın XYZ eksenindeki pozisyonu belirttim
    camera.lookAt(0, 0, 0);
    //? Kameranın bakış açısını tam orta olarak belirttim.

    const renderer = new THREE.WebGLRenderer();
    //? Görüntüleme işlemi yapılması için oluşturdum.
    renderer.setSize(window.innerWidth, window.innerHeight);
    //?renderer.setSize ile ekranın tamamını kaplasın dedim.
    renderer.setClearColor(new THREE.Color(0xAADDff));
    document.body.appendChild(renderer.domElement);
    //? DOMda Görünmesi için yazdım.

    //*****-----*****-------IŞIKLAR-----*****-----****----***---
    const ambientLight = new THREE.AmbientLight(0x333333);
    //Ambiyans ışığı oluşturuldu.
    scene.add(ambientLight);//ışık sahneye eklendi.

    // const dLight = new THREE.DirectionalLight(0xffffff,0.8);
    // scene.add(dLight);

    const spotLight = new THREE.SpotLight(0xff00dd);
    //spot ışığı oluşturdum
    scene.add(spotLight);
    spotLight.position.set(-100, 100, 0);
    const sLightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(sLightHelper)


    //*****-----*****-------NESNE-----*****-----****----***---
    const boxGeometry = new THREE.BoxGeometry();
    const boxMaterial = new THREE.MeshBasicMaterial({ color: "red" });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    //Kutu nesnesi oluşturulup sahneye eklendi.
    scene.add(box);



    //*****-----*****-------YÖN KONTROLÜ-----*****-----****----***---
    const orbit = new THREE.OrbitControls(camera, renderer.domElement);
    //orbit adlı değişkene Orbit yön kontrol methodunu atadım.
    orbit.update();



    //*****-----*****-------IZGARA-----*****-----****----***---
    const gridHelper = new THREE.GridHelper(30);
    //ızgara oluşturup sahneye ekledim. 
    scene.add(gridHelper);

    scene.fog = new THREE.FogExp2(0xFFFFFF, 0.01);
    //Sahneye sis ekledim.



    //*****-----*****-------ZEMİN-----*****-----****----***---
    const zeminGeo = new THREE.PlaneGeometry(30, 30);
    const zeminMat = new THREE.MeshLambertMaterial({
        side: THREE.DoubleSide,
    });
    //DoubleSide ile zemini iki taraflı yaptım.
    const zemin = new THREE.Mesh(zeminGeo, zeminMat);
    zemin.rotation.x = -0.5 * Math.PI;
    scene.add(zemin);


    //*****-----*****-------NESNE-2-----*****-----****----***---
    const kureGeo = new THREE.SphereGeometry(2, 20, 20);
    const kureMat = new THREE.MeshBasicMaterial({
        color: 0xffea00
    });

    const kure = new THREE.Mesh(kureGeo, kureMat);
    kure.position.set(-5, 5, 0);
    scene.add(kure);



    //*****-----*****-------NESNE-3-----*****-----****----***---
    const textureLoader = new THREE.TextureLoader();
    const ImgGeo = new THREE.BoxGeometry(4, 4, 4);
    const ImgMat = new THREE.MeshBasicMaterial({
        map: textureLoader.load("doku.jpg")
    });

    const Imgobj = new THREE.Mesh(ImgGeo, ImgMat);
    Imgobj.position.set(5, 5, 0);
    scene.add(Imgobj);



    //*****-----*****-------DAT GUI-----*****-----****----***---
    const gui = new dat.GUI();
    const options = {
        sphereColor: '#ffea00',
        //küre renk ayarı
        wireframe: false,
        hiz: 0.01
    }
    gui.addColor(options, 'sphereColor').onChange(function (e) {
        kure.material.color.set(e)
    });

    gui.add(options, 'wireframe').onChange(function (e) {
        kure.material.wireframe = e;
    });

    let adim = 0;
    gui.add(options, 'hiz', 0, 0.1);

    //*****-----*****-------ANİMASYON-----*****-----****----***---
    function animate() {
        box.rotation.y += 0.02;
        //sahnedeyi kutuyu y ekseninde 0.02 birim hareket ettirdim.

        Imgobj.rotation.y += 0.02;
        adim += options.hiz;
        kure.position.y = 10 * Math.abs(Math.sin(adim));

        requestAnimationFrame(animate);//animasyonu çalıştırdım
        renderer.render(scene, camera);
    }
    animate();
    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

init();