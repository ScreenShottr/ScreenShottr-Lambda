# ScreenShottr Lambda Services

Written for Serverless Architecture.

Services

 * S3 Signed Upload URL generator
 * Image Validation (On Upload to S3)
 * DynamoDB Image Metadata Storage
 * REST API


## API Examples

Get Signed S3 URL

Endpoint `GET /api/getSignedS3URL`
```
{
    "success": true,
    "response": {
        "signedUrl": "https://screenshottr-service-images-unprocessed-dev.s3.amazonaws.com/0831e045-8aa8-4fd3-a4dd-96c0ab47942c?AWSAccessKeyId=ASIAIMAQJDMOSUUD5CPQ&Content-Type=binary%2Foctet-stream&Expires=1510701144&Signature=1vC9mQJwlWEaNTyklASrLE56i%2FA%3D&x-amz-acl=public-read&x-amz-security-token=FQoDYXdzEE4aDLgOn91hfFNSjQXtniKAAk9vvpYC8086RITZKOQF%2Fo67K1MX2V%2Fr2JlPA%2FajSI1h9o%2FeaVcQ8%2FKtvnbA4DGsYbugJ5VJcHnDx5TluCW2IaAIRtOEsv0PPmvclc98GKiIjwhRUN5LNnso%2FUsPpsVriBvvKjHmcxiAmdstWnjy2XaebmDzOub6XzEMR%2FVGNiwstAcjOQOndoTKoP%2B3cLuZpPfw%2FRohFLKvzradSPQR1D3CfaNMcMlEF8mQpKKa2rr0WxQAW9ldM3VrWUV7GG7%2BwYIPu3Rp2o1UJKtjeUZyXkY88FCSu1kKCi6Hf900Ur4YW%2BsAx0mSXPrS5FXJiGI8kGBmdo7iYTyQ%2F7nWDuS%2FPgso7bit0AU%3D",
        "key": "0831e045-8aa8-4fd3-a4dd-96c0ab47942c"
    }
}
```

Upload to Signed URL
```
PUT /SignedURL
Host signedURLHost
```

Get Image Metadata

* Endpoint `GET /api/getImageMetadata?image_id=${key}`
* `GET /api/getImageMetadata?image_id=0831e045-8aa8-4fd3-a4dd-96c0ab47942c`

```
{
    "success": true,
    "response": {
        "data": {
            "Item": {
                "filename": "0831e045-8aa8-4fd3-a4dd-96c0ab47942c.png",
                "deleted": false,
                "dates": {
                    "created": 1510700894952,
                    "uploaded_at": 1510700976705
                },
                "image_id": "0831e045-8aa8-4fd3-a4dd-96c0ab47942c",
                "image_status": "image_uploaded",
                "fileMeta": {
                    "ext": "png",
                    "mime": "image/png"
                },
                "image_url": "https://i.screenshottr.us/0831e045-8aa8-4fd3-a4dd-96c0ab47942c.png",
                "image_owner": 0
            }
        }
    }
}
```

