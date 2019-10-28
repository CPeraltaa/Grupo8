
Feature: Is login succesfull 
  I want to make sure we can login 

  Scenario Outline: Login valid or invalid
    Given I enter my "<email>"  and "<password>"
    When I click Login 
    Then We should get "<answer>"

  Examples:
    | email               | password  | answer     |
    | jen7127@gmail.com   | 12f34l    | invalid    |
    | jen27@gmail.com     | h2f345    | invalid    |
    | jenny7127@gmail.com | pass      | valid      |