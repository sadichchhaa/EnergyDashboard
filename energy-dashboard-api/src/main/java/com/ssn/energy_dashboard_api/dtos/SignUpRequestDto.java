package com.ssn.energy_dashboard_api.dtos;

import lombok.Data;

@Data
public class SignUpRequestDto {

    private String username;
    private String email;
    private String password;

}
