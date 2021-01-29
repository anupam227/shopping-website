import React from "react"
import { API } from "../../backend";

const ImageHelper = ({product}) => {

    const imageurl = product ? `${API}/product/photo/${[product._id]}`:`https://www.amazon.in/Amazon-Brand-Solimo-Revolving-pieces/dp/B07PBBRWFG/ref=sr_1_6?adgrpid=58386280029&dchild=1&ext_vrnc=hi&gclid=CjwKCAiAxeX_BRASEiwAc1QdkW7Vuf4rHue28HdEqVUrFLiH8B0bc9zimAlJamP5MAJkum3tXmihCBoC8vAQAvD_BwE&hvadid=294135912892&hvdev=c&hvlocphy=9040182&hvnetw=g&hvqmt=e&hvrand=12204878947787935182&hvtargid=kwd-302257180553&hydadcr=5843_1738697&keywords=amazon+product&qid=1610187168&sr=8-6&tag=googinhydr1-21`
    return (
        <img
            src={imageurl}
            alt="photo"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
            className="mb-3 rounded"
        />
    )
}

export default ImageHelper;