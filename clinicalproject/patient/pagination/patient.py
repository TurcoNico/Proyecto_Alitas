from rest_framework.pagination import PageNumberPagination  

class PatientPagination(PageNumberPagination):  
    page_size_query_param = 'page_size'  # Permite que los clientes especifiquen el tamaño de la página  
    max_page_size = 100  # Define un máximo para el tamaño de la página 