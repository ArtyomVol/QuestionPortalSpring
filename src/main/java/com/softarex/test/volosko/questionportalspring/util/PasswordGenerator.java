package com.softarex.test.volosko.questionportalspring.util;

import java.security.SecureRandom;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public final class PasswordGenerator {
    private static String PASSWORD_SYMBOLS;
    private static final SecureRandom random = new SecureRandom();

    public PasswordGenerator(){
        String letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String numbers = "0123456789";
        String passwordSymbols = letters + numbers + numbers + numbers;
        PASSWORD_SYMBOLS = shuffleString(passwordSymbols);
    }

    public String generateRandomPassword() {
        int length = 8;
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int rndCharAt = random.nextInt(PASSWORD_SYMBOLS.length());
            char rndChar = PASSWORD_SYMBOLS.charAt(rndCharAt);
            sb.append(rndChar);
        }
        return sb.toString();
    }

    public String shuffleString(String string) {
        List<String> letters = Arrays.asList(string.split(""));
        Collections.shuffle(letters);
        return String.join("", letters);
    }

}