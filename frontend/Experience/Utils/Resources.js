import Loaders from "./Loaders.js";
import { EventEmitter } from "events";
import * as THREE from "three";

export default class Resources extends EventEmitter {
    constructor(assets) {
        super();

        this.items = {};
        this.assets = assets;
        this.location = "westgate";

        this.loaders = new Loaders().loaders;

        this.startLoading();
    }

    startLoading() {
        this.loaded = 0;
        this.queue = this.assets[0][this.location].assets.length;

        for (const asset of this.assets[0][this.location].assets) {
            if (asset.type === "glbModel") {
                this.loaders.gltfLoader.load(
                    asset.path,
                    (file) => {
                        this.singleAssetLoaded(asset, file);
                    },
                    undefined,
                    (error) => {
                        console.error(`Error loading model ${asset.name}:`, error);
                        // Continue loading even if one asset fails
                        this.singleAssetLoaded(asset, null);
                    }
                );
            } else if (asset.type === "imageTexture") {
                this.loaders.textureLoader.load(
                    asset.path,
                    (file) => {
                        this.singleAssetLoaded(asset, file);
                    },
                    undefined,
                    (error) => {
                        console.error(`Error loading texture ${asset.name}:`, error);
                        this.singleAssetLoaded(asset, null);
                    }
                );
            } else if (asset.type === "cubeTexture") {
                this.loaders.cubeTextureLoader.load(
                    asset.path,
                    (file) => {
                        this.singleAssetLoaded(asset, file);
                    },
                    undefined,
                    (error) => {
                        console.error(`Error loading cube texture ${asset.name}:`, error);
                        this.singleAssetLoaded(asset, null);
                    }
                );
            } else if (asset.type === "videoTexture") {
                try {
                    this.video = this.video || {};
                    this.videoTexture = this.videoTexture || {};

                    this.video[asset.name] = document.createElement("video");
                    this.video[asset.name].src = asset.path;
                    this.video[asset.name].muted = true;
                    this.video[asset.name].playsInline = true;
                    this.video[asset.name].autoplay = true;
                    this.video[asset.name].loop = true;
                    
                    this.video[asset.name].addEventListener("error", (e) => {
                        console.error(`Error loading video ${asset.name}:`, e);
                        this.singleAssetLoaded(asset, null);
                    });

                    this.video[asset.name].play().catch((error) => {
                        console.error(`Error playing video ${asset.name}:`, error);
                    });

                    this.videoTexture[asset.name] = new THREE.VideoTexture(
                        this.video[asset.name]
                    );
                    this.videoTexture[asset.name].flipY = false;
                    this.videoTexture[asset.name].minFilter = THREE.NearestFilter;
                    this.videoTexture[asset.name].magFilter = THREE.NearestFilter;
                    this.videoTexture[asset.name].generateMipmaps = false;
                    this.videoTexture[asset.name].colorSpace = THREE.SRGBColorSpace;

                    this.singleAssetLoaded(asset, this.videoTexture[asset.name]);
                } catch (error) {
                    console.error(`Error creating video texture ${asset.name}:`, error);
                    this.singleAssetLoaded(asset, null);
                }
            }
        }
    }

    singleAssetLoaded(asset, file) {
        // Only store file if it loaded successfully
        if (file !== null && file !== undefined) {
            this.items[asset.name] = file;
        } else {
            console.warn(`Asset ${asset.name} failed to load, skipping...`);
        }
        this.loaded++;
        this.emit("loading", this.loaded, this.queue);

        if (this.loaded === this.queue) {
            this.emit("ready");
        }
    }
}
