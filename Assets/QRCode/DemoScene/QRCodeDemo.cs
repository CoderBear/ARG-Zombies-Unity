using Antares.QRCode;
using UnityEngine;

public class QRCodeDemo : MonoBehaviour
{

    public Texture2D qrCodeImage;
    private string _textToEncode = "Hello QRCode!";
    private int _width = 128;
    private int _height = 128;

    private string _decodedString = "";

    public void OnGUI()
    {
        GUILayout.BeginArea(new Rect(10, 10, Screen.width - 20, Screen.height - 20));
        GUILayout.BeginHorizontal();
        {
            GUILayout.BeginVertical(GUI.skin.box, GUILayout.Width(300), GUILayout.ExpandHeight(true));
            {
                GUILayout.BeginVertical(GUI.skin.box);
                {
                    GUILayout.Label("Text to encode:");
                    _textToEncode = GUILayout.TextArea(_textToEncode, GUILayout.Height(50));
                }
                GUILayout.EndVertical();



                GUILayout.BeginVertical(GUI.skin.box);
                {
                    GUILayout.Label("Texture width: " + _width);
                    _width = (int)GUILayout.HorizontalSlider(_width, 64, 512);
                }
                GUILayout.EndVertical();

                GUILayout.BeginVertical(GUI.skin.box);
                {
                    GUILayout.Label("Texture height: " + _height);
                    _height = (int)GUILayout.HorizontalSlider(_height, 64, 512);
                }
                GUILayout.EndVertical();

                if (GUILayout.Button("Encode"))
                {
                    if (qrCodeImage != null) Destroy(qrCodeImage);
                    //qrCodeImage = QRCodeProcessor.Encode(_textToEncode, _width, _height);
                   qrCodeImage = QRCodeProcessor.Encode(_textToEncode , _width, _width, ErrorCorrectionLevel.H, "Dude.. :D" );
                }

                GUILayout.Space(10);
                GUILayout.BeginVertical(GUI.skin.box);
                GUILayout.EndVertical();
                GUILayout.Space(10);

                GUI.enabled = qrCodeImage != null;

                if (GUILayout.Button("Decode"))
                {
                	qrCodeImage  = ( Texture2D )this.renderer.material.mainTexture;

                    _decodedString = QRCodeProcessor.Decode(qrCodeImage).Text;
                    Debug.Log( _decodedString );
                }

                GUILayout.BeginVertical(GUI.skin.box);
                {
                    GUILayout.Label("Decoded text:");
                    GUILayout.TextArea(_decodedString, GUILayout.Height(50));
                }
                GUILayout.EndVertical();

                GUI.enabled = true;
            }
            GUILayout.EndVertical();




            GUILayout.BeginVertical(/*GUI.skin.box,*/ GUILayout.ExpandHeight(true));
            {
                GUILayout.FlexibleSpace();
                GUILayout.BeginHorizontal();
                {
                    GUILayout.FlexibleSpace();
                    if (qrCodeImage != null)
                    {
                        //GUILayout.Label(qrCodeImage);
                    }
                    else
                    {
                        GUILayout.Label("Press \"Encode\" to generate QRCode texture.");
                    }
                    GUILayout.FlexibleSpace();
                }
                GUILayout.EndHorizontal();
                GUILayout.FlexibleSpace();
            }
            GUILayout.EndVertical();
        }
        GUILayout.EndHorizontal();
        GUILayout.EndArea();
    }


    public void Update()
    {
        transform.rotation *= Quaternion.Euler(0.1f, 0.2f, 0.3f);

        this.renderer.material.mainTexture = qrCodeImage;
    }

}
