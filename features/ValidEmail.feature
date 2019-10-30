
Feature: Is the entry a valid email? 
  I want to make sure the email enter in the email field is a valid email

  Scenario Outline: Email valid(true) or invalid(false)
    Given I enter my "<email>" 
    When I click submit 
    Then We should get "<answer>"

  Examples:
    | email               | answer  |
    | jen7127@gmail.com   | true    |
    | jen27@gmail.com     | true    |
    | jenny7127@gmaicom   | false   |
    | jenny7127gmaicom    | false   |