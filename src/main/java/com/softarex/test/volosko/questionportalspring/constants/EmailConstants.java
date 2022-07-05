package com.softarex.test.volosko.questionportalspring.constants;

public final class EmailConstants {
    public static final String EMAIL_FROM_ADDRESS = "questionportalspring@gmail.com";
    public static final String REGISTRATION_MESSAGE =
            "Congratulations!!! You have successfully registered on the LOGOTYPE website. " +
                    "Your email: §1§, your password: §2§. Do not share this data with anyone.";
    public static final String REGISTRATION_SUBJECT = "Registration";
    public static final String PROFILE_DELETING_MESSAGE =
            "Thank you for your time with us. Your account on the LOGOTYPE website has been successfully deleted.";
    public static final String PROFILE_DELETING_SUBJECT = "Profile deleting";
    public static final String PASSWORD_CHANGE_MESSAGE =
            "Someone wants to change your password. If this is not you, ignore this message. Otherwise, here is a " +
                    "confirmation code that cannot be shared with anyone: §1§.";
    public static final String PASSWORD_CHANGE_SUBJECT = "Password change";


    private EmailConstants() {
    }
}
