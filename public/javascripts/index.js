$(document).ready(function(){
    		
            $("#forgotpasswordform").hide();
            $(".submit-buttons").hide();
			$("#forgotpasswordlink").click(function(){
			    $("#forgotpasswordform").show(750);
			    $("#loginform").hide(750);
			});
			$("#rememberedpasswordlink").click(function(){
			    $("#loginform").show(750);
                $("#forgotpasswordform").hide(750);
			});
			

    		function validateEmailAddress(id,idlabel){
    			var emailAddress=$("#"+id).val();
    			if(emailAddress===""){
    					$("#"+idlabel).text("Email Address Cannot be Empty");	
    				    return false;
    			}
    			var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
    			if(re.test(emailAddress) &&(/@gmail.com/.test(emailAddress) || /@yahoo.co.in/.test(emailAddress) || /@hotmail.com/.test(emailAddress))){
    				return true;
    			}else{
    					$("#"+idlabel).text("Email Address Not Valid");
    				    return false;
    			}
    		}
    		
    		function checkpasswords(){
    			var pwd=$("#register_password").val();
    			if(pwd===""){
    				$("#register_after_password").text("Password cannot be Empty");
    				return false;
    			}
    			if(pwd.length<7){
    				$("#register_after_password").text("Password must be of atleast 7 characters in length");
    				return false;
    			}
    			var cnfmpwd=$("#register_confirm_password").val();
    			if(cnfmpwd===""){
    				$("#register_after_confirm").text("Confirm Password cannot be Empty");
    				return false;
    			}
    			if(cnfmpwd===pwd){
    				return true;
    			}else{
    				$("#register_after_confirm").text("Password Fields Do Not Match");
    				return false;
    			}
    		}

            function checkpassword(id,idlabel){
                var pwd=$("#"+id).val();
                if(pwd===""){
                    $("#"+idlabel).text("Password cannot be Empty");
                    return false;
                }else if(pwd.length<7){
                    $("#"+idlabel).text("Password must be of atleast 7 characters in length");
                    return false;   
                }
                return true;
            }

    		function validateloginform(){
                $("#login .errorcode").text("");
    			if(validateEmailAddress("login_email","login_after_email") && checkpassword("login_password","login_after_password")){
    				//$("#loginform button").prop('disabled', false);
    				$("#loginform button").show(750);
    			}else{
                    $("#loginform button").hide(750);
                }
    		}
// checkUserType() && validatenames() && validateEmailAddress("register_email","register_after_email") && checkpasswords() &&
    		function validateregistrationform(){
    			$("#register .errorcode").text("");
    			if(checkUserType() && validatenames() && validateEmailAddress("register_email","register_after_email") && checkpasswords() && checkTerms()){
    				$("#register_submit").show(750);
    				return true;
    			}else{
                    $("#register_submit").hide(750);
    				return false;
    			} 
    		}
    		function validatenames(){
    			var name=$("#register_name").val();
    			var surname=$("#register_surname").val();

    			if(name===""){
    				if(surname===""){
    					$("#register_after_name").text("Name & Surname Fields Cannot be Empty");
    				}else{
    					$("#register_after_name").text("Name Field Cannot be Empty");
    				}
    				return false;
    			}
    			if(surname===""){
    				$("#register_after_name").text("Surname Field Cannot be Empty");
    				return false;
    			}
    			return true;
    		}

    		function checkUserType(){
    			if($('input[name=usertype]').val()==="Broker" || $('input[name=usertype]').val()==="Customer"){
    				return true;
    			}else{
    				return false;
    			}
    		}
            function checkTerms(){
                if($("#terms").prop("checked")){
                    return true;
                }else{
                    $("#register_after_terms").text("Please Accept the Terms & Conditions");    
                    return false;
                }
            }

            $("#register input").on("keyup change",function(){
                validateregistrationform();   
            });


			$("#loginform input").on("keyup change",function(){
			     validateloginform();
			});

            $("#forgotpasswordform input").on("keyup change",function(){
                if(!validateEmailAddress("forgotpassword_email","forgot_after_email")){
                    $("#forgotpasswordsubmit").hide(750);
                }else{
                    $("#forgotpasswordform .errorcode").text("");
                    $("#forgotpasswordsubmit").show(750);
                }
            });            

});